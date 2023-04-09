import React from 'react'
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
    const { t } = useTranslation()
    return (
        <div className="alert alert-danger" role="alert">
            <h1 className="text-center red">{t('error.page_not_found')}</h1>
        </div>
    );
}
