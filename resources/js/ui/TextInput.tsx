import { InputHTMLAttributes, ReactNode } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    suffix?: ReactNode;
}

export const TextInput = ({
    icon,
    suffix,
    className = '',
    ...rest
}: TextInputProps) => (
    <div className="input-wrap">
        {icon && <span className="input-icon">{icon}</span>}
        <input
            className={`input ${icon ? 'has-icon' : ''} ${className}`}
            {...rest}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
);
