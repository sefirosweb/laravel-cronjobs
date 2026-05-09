import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { ConfirmModal } from '@/ui/ConfirmModal';
import { Empty } from '@/ui/Empty';
import { TableFooter } from '@/ui/TableFooter';
import { TextInput } from '@/ui/TextInput';
import { useToast } from '@/ui/Toast';
import { IconPlus, IconSearch, IconSettings, IconX } from '@/ui/icons';
import {
    useCreateCronjob,
    useCronjobs,
    useExecuteCronjob,
    useToggleCronjob,
    useUpdateCronjob,
} from '@/hooks/useCronjobs';
import { extractError } from '@/lib/extractError';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import { Cronjob, CronjobStatus } from '@/types/store';
import { CronExpressionModal } from './CronExpressionModal';
import { CronjobEditDrawer, CronjobEditState } from './CronjobEditDrawer';
import { CronjobRow } from './CronjobRow';

export const CronjobsView = () => {
    const { t } = useTranslation();
    const toast = useToast();

    const [status, setStatus] = useState<CronjobStatus>('active');
    const cronjobsQ = useCronjobs(status);
    const createMut = useCreateCronjob();
    const updateMut = useUpdateCronjob();
    const toggleMut = useToggleCronjob();
    const executeMut = useExecuteCronjob();

    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [editing, setEditing] = useState<CronjobEditState>(null);
    const [editingCron, setEditingCron] = useState<Cronjob | null>(null);
    const [confirmExecute, setConfirmExecute] = useState<Cronjob | null>(null);
    const [confirmDisable, setConfirmDisable] = useState<Cronjob | null>(null);
    const [confirmEnable, setConfirmEnable] = useState<Cronjob | null>(null);

    const cronjobs = cronjobsQ.data ?? [];

    const debouncedQ = useDebouncedValue(q, 200);
    const filtered = useMemo(() => {
        if (!debouncedQ) return cronjobs;
        const lq = debouncedQ.toLowerCase();
        return cronjobs.filter(
            (c) =>
                c.name.toLowerCase().includes(lq) ||
                (c.controller ?? '').toLowerCase().includes(lq) ||
                (c.description ?? '').toLowerCase().includes(lq),
        );
    }, [cronjobs, debouncedQ]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [totalPages, page]);

    return (
        <div>
            <div className="page-header">
                <div className="page-title-wrap">
                    <h1>{t('cronjobs.title')}</h1>
                    <p>{t('cronjobs.subtitle')}</p>
                </div>
                <Button
                    variant="primary"
                    icon={<IconPlus size={16} stroke={2.4} />}
                    onClick={() => setEditing({ mode: 'create' })}
                >
                    {t('cronjobs.new')}
                </Button>
            </div>

            <div className="page-toolbar">
                <div
                    className="sort-toggle"
                    role="tablist"
                    style={{ marginTop: 0, marginRight: 12 }}
                >
                    {(['active', 'all', 'deleted'] as CronjobStatus[]).map(
                        (s) => (
                            <button
                                key={s}
                                type="button"
                                role="tab"
                                className={
                                    'sort-toggle-btn' +
                                    (status === s ? ' is-active' : '')
                                }
                                onClick={() => setStatus(s)}
                            >
                                {t('cronjobs.status.' + s)}
                            </button>
                        ),
                    )}
                </div>
                <TextInput
                    icon={<IconSearch size={14} />}
                    placeholder={t('cronjobs.searchPlaceholder')}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    suffix={
                        q && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setQ('')}
                            >
                                <IconX size={12} />
                            </Button>
                        )
                    }
                />
            </div>

            <div className="card">
                {filtered.length === 0 ? (
                    <Empty
                        icon={<IconSettings size={20} />}
                        title={
                            q
                                ? t('cronjobs.emptyFiltered.title')
                                : t('cronjobs.empty.title')
                        }
                        description={
                            q
                                ? t('cronjobs.emptyFiltered.description')
                                : t('cronjobs.empty.description')
                        }
                        action={
                            !q && (
                                <Button
                                    variant="primary"
                                    icon={<IconPlus size={14} />}
                                    onClick={() =>
                                        setEditing({ mode: 'create' })
                                    }
                                >
                                    {t('cronjobs.new')}
                                </Button>
                            )
                        }
                    />
                ) : (
                    <table className="t">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>#</th>
                                <th>{t('cronjobs.col.name')}</th>
                                <th>{t('cronjobs.col.cron')}</th>
                                <th>{t('cronjobs.col.nextRun')}</th>
                                <th>{t('cronjobs.col.lastRun')}</th>
                                <th
                                    style={{ width: 200, textAlign: 'right' }}
                                >
                                    {t('cronjobs.col.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageRows.map((c) => (
                                <CronjobRow
                                    key={c.id}
                                    cronjob={c}
                                    onEdit={() =>
                                        setEditing({ mode: 'edit', cronjob: c })
                                    }
                                    onEditCron={() => setEditingCron(c)}
                                    onExecute={() => setConfirmExecute(c)}
                                    onDisable={() => setConfirmDisable(c)}
                                    onEnable={() => setConfirmEnable(c)}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                {filtered.length > 0 && (
                    <TableFooter
                        page={page}
                        totalPages={totalPages}
                        onPage={setPage}
                        perPage={perPage}
                        onPerPage={setPerPage}
                        total={filtered.length}
                    />
                )}
            </div>

            <CronjobEditDrawer
                editing={editing}
                onClose={() => setEditing(null)}
                busy={createMut.isPending || updateMut.isPending}
                onSave={(data) => {
                    if (!editing) return;
                    if (editing.mode === 'create') {
                        createMut.mutate(data, {
                            onSuccess: () => {
                                toast.success(
                                    t('cronjobs.toast.created', {
                                        name: data.name,
                                    }),
                                );
                                setEditing(null);
                            },
                            onError: (err) => toast.error(extractError(err)),
                        });
                    } else {
                        // Strip cron_expression on update — it has its own endpoint.
                        const {
                            cron_expression: _ignored,
                            ...rest
                        } = data;
                        void _ignored;
                        updateMut.mutate(
                            { id: editing.cronjob.id, payload: rest },
                            {
                                onSuccess: () => {
                                    toast.success(t('cronjobs.toast.updated'));
                                    setEditing(null);
                                },
                                onError: (err) =>
                                    toast.error(extractError(err)),
                            },
                        );
                    }
                }}
            />

            <CronExpressionModal
                cronjob={editingCron}
                onClose={() => setEditingCron(null)}
                onSaved={() => {
                    toast.success(t('cronjobs.toast.cronUpdated'));
                    setEditingCron(null);
                }}
            />

            <ConfirmModal
                open={!!confirmExecute}
                onClose={() => setConfirmExecute(null)}
                onConfirm={() => {
                    if (!confirmExecute) return;
                    executeMut.mutate(confirmExecute.id, {
                        onSuccess: () => {
                            toast.success(
                                t('cronjobs.toast.executed', {
                                    name: confirmExecute.name,
                                }),
                            );
                            setConfirmExecute(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('cronjobs.executeConfirm.title')}
                description={
                    confirmExecute &&
                    t('cronjobs.executeConfirm.description', {
                        name: confirmExecute.name,
                    })
                }
                confirmText={t('cronjobs.executeConfirm.confirm')}
                tone="warning"
                busy={executeMut.isPending}
            />

            <ConfirmModal
                open={!!confirmDisable}
                onClose={() => setConfirmDisable(null)}
                onConfirm={() => {
                    if (!confirmDisable) return;
                    toggleMut.mutate(confirmDisable.id, {
                        onSuccess: () => {
                            toast.success(
                                t('cronjobs.toast.disabled', {
                                    name: confirmDisable.name,
                                }),
                            );
                            setConfirmDisable(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('cronjobs.disableConfirm.title')}
                description={
                    confirmDisable &&
                    t('cronjobs.disableConfirm.description', {
                        name: confirmDisable.name,
                    })
                }
                confirmText={t('cronjobs.actions.disable')}
                busy={toggleMut.isPending}
            />

            <ConfirmModal
                open={!!confirmEnable}
                onClose={() => setConfirmEnable(null)}
                onConfirm={() => {
                    if (!confirmEnable) return;
                    toggleMut.mutate(confirmEnable.id, {
                        onSuccess: () => {
                            toast.success(
                                t('cronjobs.toast.enabled', {
                                    name: confirmEnable.name,
                                }),
                            );
                            setConfirmEnable(null);
                        },
                        onError: (err) => toast.error(extractError(err)),
                    });
                }}
                title={t('cronjobs.enableConfirm.title')}
                description={
                    confirmEnable &&
                    t('cronjobs.enableConfirm.description', {
                        name: confirmEnable.name,
                    })
                }
                confirmText={t('cronjobs.enableConfirm.confirm')}
                tone="warning"
                busy={toggleMut.isPending}
            />
        </div>
    );
};
