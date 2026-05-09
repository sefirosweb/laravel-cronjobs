import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconChevronDown } from '@/ui/icons';

interface LangDef {
    code: string;
    label: string;
    flag: string;
}

const LANGUAGES: LangDef[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    const current = i18n.resolvedLanguage ?? i18n.language;
    const active =
        LANGUAGES.find((l) => current?.startsWith(l.code)) ?? LANGUAGES[0];

    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('mousedown', onClick);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('mousedown', onClick);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const select = (code: string) => {
        void i18n.changeLanguage(code);
        setOpen(false);
    };

    return (
        <div className="lang-switcher" ref={wrapRef}>
            <button
                type="button"
                className="lang-trigger"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                title={active.label}
            >
                <span className="lang-flag">{active.flag}</span>
                <span className="lang-code">{active.code.toUpperCase()}</span>
                <IconChevronDown size={12} />
            </button>
            {open && (
                <div className="lang-menu" role="menu">
                    {LANGUAGES.map((l) => {
                        const isActive = l.code === active.code;
                        return (
                            <button
                                type="button"
                                key={l.code}
                                role="menuitemradio"
                                aria-checked={isActive}
                                className={`lang-option ${isActive ? 'is-active' : ''}`}
                                onClick={() => select(l.code)}
                            >
                                <span className="lang-flag">{l.flag}</span>
                                <span className="lang-option-label">
                                    {l.label}
                                </span>
                                {isActive && <IconCheck size={12} stroke={2.4} />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
