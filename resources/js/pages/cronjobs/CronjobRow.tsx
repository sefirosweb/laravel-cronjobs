import { useTranslation } from 'react-i18next';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
    IconClock,
    IconPencil,
    IconPlay,
    IconPower,
    IconRefresh,
} from '@/ui/icons';
import { Cronjob } from '@/types/store';

interface Props {
    cronjob: Cronjob;
    onEdit: () => void;
    onEditCron: () => void;
    onExecute: () => void;
    onDisable: () => void;
    onEnable: () => void;
}

export const CronjobRow = ({
    cronjob,
    onEdit,
    onEditCron,
    onExecute,
    onDisable,
    onEnable,
}: Props) => {
    const { t } = useTranslation();
    const isDisabled = !!cronjob.deleted_at;

    return (
        <tr className={isDisabled ? 'is-trashed' : undefined}>
            <td className="t-id">{cronjob.id}</td>
            <td>
                <div className="t-name-cell" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="name">{cronjob.name}</span>
                        {isDisabled && (
                            <Badge variant="danger">
                                {t('cronjobs.status.disabledBadge')}
                            </Badge>
                        )}
                    </div>
                    {cronjob.description && (
                        <span
                            style={{
                                color: 'var(--fg-muted)',
                                fontSize: 12,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 320,
                            }}
                        >
                            {cronjob.description}
                        </span>
                    )}
                </div>
            </td>
            <td>
                <code
                    className="mono"
                    style={{
                        background: 'var(--bg-muted)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 12.5,
                        color: 'var(--fg)',
                    }}
                >
                    {cronjob.cron_expression || '—'}
                </code>
            </td>
            <td
                className="mono"
                style={{ color: 'var(--fg-muted)', fontSize: 12 }}
            >
                {cronjob.next_run_at ?? (
                    <span style={{ color: 'var(--fg-subtle)', fontStyle: 'italic' }}>
                        {t('cronjobs.status.never')}
                    </span>
                )}
            </td>
            <td
                className="mono"
                style={{ color: 'var(--fg-muted)', fontSize: 12 }}
            >
                {cronjob.last_run_at ?? (
                    <span style={{ color: 'var(--fg-subtle)', fontStyle: 'italic' }}>
                        {t('cronjobs.status.never')}
                    </span>
                )}
            </td>
            <td>
                <div className="t-actions">
                    {!isDisabled && (
                        <>
                            <Button
                                variant="ghost"
                                onClick={onEditCron}
                                title={t('cronjobs.actions.editCron')}
                            >
                                <IconClock size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onEdit}
                                title={t('cronjobs.actions.edit')}
                            >
                                <IconPencil size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onExecute}
                                title={t('cronjobs.actions.execute')}
                            >
                                <IconPlay size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onDisable}
                                title={t('cronjobs.actions.disable')}
                            >
                                <IconPower size={14} />
                            </Button>
                        </>
                    )}
                    {isDisabled && (
                        <Button
                            variant="ghost"
                            onClick={onEnable}
                            title={t('cronjobs.actions.enable')}
                        >
                            <IconRefresh size={14} />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};
