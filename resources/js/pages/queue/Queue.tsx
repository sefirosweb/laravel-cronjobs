import { useTranslation } from 'react-i18next';
import { Empty } from '@/ui/Empty';
import { IconRefresh } from '@/ui/icons';

// TODO: implement queue inspection. The previous version of this package
// shipped this page as a placeholder ("error.still_not_ready"); the
// rewrite keeps it as a stub until a real backend endpoint exists to
// list pending / failed / running jobs from the database queue driver.
export const QueueView = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="page-header">
                <div className="page-title-wrap">
                    <h1>{t('queue.title')}</h1>
                    <p>{t('queue.subtitle')}</p>
                </div>
            </div>
            <div className="card">
                <Empty
                    icon={<IconRefresh size={20} />}
                    title={t('queue.empty.title')}
                    description={t('queue.empty.description')}
                />
            </div>
        </div>
    );
};
