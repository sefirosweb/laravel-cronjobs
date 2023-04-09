import React from "react";
import { useTranslation } from "react-i18next";

export const Queue = () => {
    const { t } = useTranslation()

    return (
        <div className="alert alert-warning" role="alert">
            <h1 className="text-center">{t('error.still_not_ready')}</h1>
        </div>
    );
}