import { ReactNode } from 'react';

interface EmptyProps {
    icon: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
}

export const Empty = ({ icon, title, description, action }: EmptyProps) => (
    <div className="empty">
        <div className="empty-icon">{icon}</div>
        <h3 className="empty-title">{title}</h3>
        {description && <p className="empty-desc">{description}</p>}
        {action}
    </div>
);
