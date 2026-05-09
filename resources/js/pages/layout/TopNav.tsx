import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconLogo, IconSettings, IconRefresh } from '@/ui/icons';
import { LanguageSwitcher } from './LanguageSwitcher';

export type Tab = 'cronjobs' | 'queue';

interface TopNavProps {
    tab: Tab;
    onTab: (tab: Tab) => void;
    counts: { cronjobs: number };
}

interface TabDef {
    id: Tab;
    label: string;
    icon: ReactNode;
    count?: number;
}

export const TopNav = ({ tab, onTab, counts }: TopNavProps) => {
    const { t } = useTranslation();

    const tabs: TabDef[] = [
        {
            id: 'cronjobs',
            label: t('nav.cronjobs'),
            icon: <IconSettings size={14} />,
            count: counts.cronjobs,
        },
        {
            id: 'queue',
            label: t('nav.queue'),
            icon: <IconRefresh size={14} />,
        },
    ];

    return (
        <nav className="top-nav">
            <div className="top-nav-inner">
                <div className="nav-brand">
                    <IconLogo size={22} />
                    <span>{t('nav.appName')}</span>
                </div>
                <div className="nav-tabs">
                    {tabs.map((it) => (
                        <button
                            key={it.id}
                            className={`nav-tab ${tab === it.id ? 'is-active' : ''}`}
                            onClick={() => onTab(it.id)}
                        >
                            {it.icon}
                            {it.label}
                            {it.count !== undefined && (
                                <span className="nav-tab-count">{it.count}</span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="nav-right">
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};
