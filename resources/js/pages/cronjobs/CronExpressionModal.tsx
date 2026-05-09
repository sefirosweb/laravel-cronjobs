import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { TextInput } from '@/ui/TextInput';
import { useToast } from '@/ui/Toast';
import {
    usePreviewCronExpression,
    useUpdateCronExpression,
} from '@/hooks/useCronjobs';
import { extractError } from '@/lib/extractError';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import { Cronjob } from '@/types/store';

interface Props {
    cronjob: Cronjob | null;
    onClose: () => void;
    onSaved: () => void;
}

const SHORTCUTS: Array<{ expr: string; label: string }> = [
    { expr: '* * * * *', label: 'cada minuto' },
    { expr: '0 * * * *', label: 'cada hora' },
    { expr: '0 0 * * *', label: 'diariamente 00:00' },
    { expr: '0 0 * * 0', label: 'cada domingo' },
    { expr: '0 0 1 * *', label: 'día 1 del mes' },
];

export const CronExpressionModal = ({ cronjob, onClose, onSaved }: Props) => {
    const { t } = useTranslation();
    const toast = useToast();
    const [expr, setExpr] = useState('');
    const updateMut = useUpdateCronExpression();
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, !!cronjob);

    useEffect(() => {
        setExpr(cronjob?.cron_expression ?? '');
    }, [cronjob]);

    useEffect(() => {
        if (!cronjob || updateMut.isPending) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [cronjob, updateMut.isPending, onClose]);

    // Debounce so we don't pelt /preview_job on every keystroke.
    const debouncedExpr = useDebouncedValue(expr, 400);
    const preview = usePreviewCronExpression(debouncedExpr);

    if (!cronjob) return null;

    const submit = () => {
        updateMut.mutate(
            { id: cronjob.id, expression: expr.trim() },
            {
                onSuccess: () => onSaved(),
                onError: (err) => toast.error(extractError(err)),
            },
        );
    };

    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="modal"
                style={{ maxWidth: 520 }}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-body">
                    <h3 className="modal-title">{t('cronjobs.cronModal.title')}</h3>
                    <p className="modal-desc">
                        {t('cronjobs.cronModal.description')}
                    </p>
                    <div style={{ marginTop: 18 }}>
                        <label className="label">
                            {t('cronjobs.cronModal.input')}
                        </label>
                        <TextInput
                            className="mono"
                            autoFocus
                            placeholder="* * * * *"
                            value={expr}
                            onChange={(e) => setExpr(e.target.value)}
                        />
                        <div className="help">
                            {t('cronjobs.cronModal.cheatSheet')}:{' '}
                            {SHORTCUTS.map((s, i) => (
                                <span key={s.expr}>
                                    <button
                                        type="button"
                                        onClick={() => setExpr(s.expr)}
                                        className="mono"
                                        style={{
                                            color: 'var(--accent)',
                                            cursor: 'pointer',
                                            padding: 0,
                                            fontSize: 11.5,
                                        }}
                                    >
                                        {s.expr}
                                    </button>
                                    <span
                                        style={{
                                            color: 'var(--fg-subtle)',
                                            fontSize: 11.5,
                                        }}
                                    >
                                        {' '}
                                        ({s.label})
                                    </span>
                                    {i < SHORTCUTS.length - 1 && ' · '}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <label className="label">
                            {t('cronjobs.cronModal.previewTitle')}
                        </label>
                        <pre
                            className="mono"
                            style={{
                                margin: 0,
                                padding: 12,
                                background: 'var(--bg-muted)',
                                borderRadius: 'var(--radius-sm)',
                                maxHeight: 220,
                                overflow: 'auto',
                                fontSize: 12,
                                color: 'var(--fg)',
                                lineHeight: 1.5,
                            }}
                        >
                            {preview.isFetching
                                ? t('cronjobs.cronModal.previewLoading')
                                : preview.isError
                                  ? t('cronjobs.cronModal.previewError')
                                  : (preview.data ?? '')}
                        </pre>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={updateMut.isPending}
                    >
                        {t('common.cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={submit}
                        disabled={
                            updateMut.isPending ||
                            !expr.trim() ||
                            preview.isError
                        }
                    >
                        {t('cronjobs.cronModal.saveBtn')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
