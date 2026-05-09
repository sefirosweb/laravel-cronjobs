import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';
import { IconCheck, IconX } from './icons';

type Tone = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    tone: Tone;
    msg: ReactNode;
}

interface ToastApi {
    success: (msg: ReactNode) => void;
    error: (msg: ReactNode) => void;
    info: (msg: ReactNode) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export const useToast = (): ToastApi => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
};

const toneStyle: Record<Tone, { bg: string; color: string; icon: ReactNode }> = {
    success: {
        bg: 'var(--success-soft)',
        color: 'var(--success)',
        icon: <IconCheck size={14} stroke={2.4} />,
    },
    error: {
        bg: 'var(--danger-soft)',
        color: 'var(--danger)',
        icon: <IconX size={14} stroke={2.4} />,
    },
    info: {
        bg: 'var(--accent-soft)',
        color: 'var(--accent)',
        icon: <IconCheck size={14} stroke={2.4} />,
    },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const push = useCallback((toast: Omit<Toast, 'id'>, duration = 2800) => {
        const id = Math.random().toString(36).slice(2);
        setToasts((t) => [...t, { ...toast, id }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
    }, []);

    const api: ToastApi = {
        success: (msg) => push({ tone: 'success', msg }),
        error: (msg) => push({ tone: 'error', msg }),
        info: (msg) => push({ tone: 'info', msg }),
    };

    return (
        <ToastContext.Provider value={api}>
            {children}
            <div className="toast-wrap">
                {toasts.map((t) => {
                    const s = toneStyle[t.tone];
                    return (
                        <div className="toast" key={t.id}>
                            <span
                                className="toast-icon-wrap"
                                style={{ background: s.bg, color: s.color }}
                            >
                                {s.icon}
                            </span>
                            <div className="toast-content">{t.msg}</div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};
