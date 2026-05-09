import axios from 'axios';

declare global {
    interface Window {
        APP_PREFIX?: string;
        APP_URL?: string;
    }
}

const baseURL =
    window.APP_URL ?? `${window.location.origin}/${window.APP_PREFIX ?? 'cronjobs'}`;

export const api = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});
