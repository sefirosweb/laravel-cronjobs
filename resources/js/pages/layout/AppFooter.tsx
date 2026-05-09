import { useTranslation } from 'react-i18next';
import { IconBrandGithub } from '@/ui/icons';

const REPO_URL = 'https://github.com/sefirosweb/laravel-cronjobs';

export const AppFooter = () => {
    const { t } = useTranslation();
    return (
        <footer className="app-footer">
            <span className="app-footer-credit">
                {t('footer.builtBy')}{' '}
                <a
                    href="https://github.com/sefirosweb"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    sefirosweb
                </a>
            </span>
            <a
                className="app-footer-repo"
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                title={t('footer.viewSource')}
            >
                <IconBrandGithub size={14} />
                <span>laravel-cronjobs</span>
            </a>
        </footer>
    );
};
