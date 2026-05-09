import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    icon?: ReactNode;
}

export const Button = ({
    variant = 'secondary',
    size = 'md',
    icon,
    children,
    className = '',
    ...rest
}: ButtonProps) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        !children && 'btn-icon',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} {...rest}>
            {icon}
            {children}
        </button>
    );
};
