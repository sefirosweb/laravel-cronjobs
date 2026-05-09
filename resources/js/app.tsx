import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCronjobs } from '@/hooks/useCronjobs';
import '@/lib/i18n';
import { CronjobsView } from '@/pages/cronjobs/Cronjobs';
import { QueueView } from '@/pages/queue/Queue';
import { Tab, TopNav } from '@/pages/layout/TopNav';
import { ToastProvider } from '@/ui/Toast';
import '@styles/app.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5_000, refetchOnWindowFocus: false },
    },
});

const validTabs: Tab[] = ['cronjobs', 'queue'];

const readTabFromHash = (): Tab => {
    const h = window.location.hash.replace('#', '');
    return validTabs.includes(h as Tab) ? (h as Tab) : 'cronjobs';
};

const Shell = () => {
    const [tab, setTab] = useState<Tab>(readTabFromHash);

    useEffect(() => {
        window.location.hash = tab;
    }, [tab]);

    useEffect(() => {
        const onHash = () => setTab(readTabFromHash());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const cronjobsQ = useCronjobs('active');

    return (
        <ToastProvider>
            <TopNav
                tab={tab}
                onTab={setTab}
                counts={{ cronjobs: cronjobsQ.data?.length ?? 0 }}
            />
            <main className="page">
                {tab === 'cronjobs' && <CronjobsView />}
                {tab === 'queue' && <QueueView />}
            </main>
        </ToastProvider>
    );
};

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Shell />
            </QueryClientProvider>
        </StrictMode>,
    );
}
