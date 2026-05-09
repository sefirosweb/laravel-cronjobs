import { ReactNode } from 'react';

interface FieldProps {
    label?: ReactNode;
    help?: ReactNode;
    children: ReactNode;
}

export const Field = ({ label, help, children }: FieldProps) => (
    <div className="field">
        {label && <label className="label">{label}</label>}
        {children}
        {help && <div className="help">{help}</div>}
    </div>
);
