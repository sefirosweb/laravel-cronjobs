import { ReactNode, useEffect, useRef } from 'react';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { Button } from './Button';
import { IconX } from './icons';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    subtitle?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}

export const Drawer = ({
    open,
    onClose,
    title,
    subtitle,
    footer,
    children,
}: DrawerProps) => {
    const drawerRef = useRef<HTMLElement>(null);
    useFocusTrap(drawerRef, open);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <>
            <div className="drawer-overlay" onClick={onClose} />
            <aside
                className="drawer"
                role="dialog"
                aria-modal="true"
                ref={drawerRef}
            >
                <div className="drawer-header">
                    <div>
                        <h2 className="drawer-title">{title}</h2>
                        {subtitle && (
                            <div className="drawer-subtitle">{subtitle}</div>
                        )}
                    </div>
                    <Button variant="ghost" onClick={onClose} aria-label="Cerrar">
                        <IconX size={16} />
                    </Button>
                </div>
                <div className="drawer-body">{children}</div>
                {footer && <div className="drawer-footer">{footer}</div>}
            </aside>
        </>
    );
};
