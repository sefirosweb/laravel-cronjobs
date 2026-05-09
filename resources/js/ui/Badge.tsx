import { ReactNode } from 'react';
import { IconX } from './icons';

type Variant = 'default' | 'indigo' | 'success' | 'danger' | 'warning';

interface BadgeProps {
    children: ReactNode;
    variant?: Variant;
    removable?: boolean;
    onRemove?: () => void;
    dot?: string;
}

export const Badge = ({
    children,
    variant = 'default',
    removable,
    onRemove,
    dot,
}: BadgeProps) => {
    const classes = [
        'badge',
        variant !== 'default' && `badge-${variant}`,
        removable && 'badge-removable',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes}>
            {dot && <span className="badge-dot" style={{ background: dot }} />}
            {children}
            {removable && (
                <button onClick={onRemove} aria-label="Quitar">
                    <IconX size={11} stroke={2.2} />
                </button>
            )}
        </span>
    );
};
