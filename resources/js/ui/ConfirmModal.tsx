import { ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { Button } from './Button';
import { IconAlertTriangle } from './icons';

type Tone = 'danger' | 'warning';

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: ReactNode;
    description?: ReactNode;
    confirmText?: ReactNode;
    tone?: Tone;
    busy?: boolean;
}

const toneStyles: Record<Tone, { bg: string; color: string }> = {
    danger: { bg: 'var(--danger-soft)', color: 'var(--danger)' },
    warning: { bg: 'var(--warning-soft)', color: 'var(--warning)' },
};

export const ConfirmModal = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    tone = 'danger',
    busy,
}: ConfirmModalProps) => {
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, open);

    useEffect(() => {
        if (!open || busy) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, busy, onClose]);

    if (!open) return null;
    const style = toneStyles[tone];
    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="modal" ref={modalRef} role="dialog" aria-modal="true">
                <div className="modal-body">
                    <div
                        className="modal-icon-wrap"
                        style={{ background: style.bg, color: style.color }}
                    >
                        <IconAlertTriangle size={18} stroke={2} />
                    </div>
                    <h3 className="modal-title">{title}</h3>
                    {description && <p className="modal-desc">{description}</p>}
                </div>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={busy}>
                        {t('common.cancel')}
                    </Button>
                    <Button
                        variant={tone === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        disabled={busy}
                    >
                        {confirmText ?? t('common.confirm')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
