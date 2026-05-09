import { api } from './client';
import { Cronjob, CronjobPayload, CronjobStatus, Id } from '@/types/store';

interface ListResponse<T> {
    success: boolean;
    data: T[];
}

interface ScalarResponse<T> {
    success: boolean;
    data: T;
}

export const fetchCronjobs = async (
    status: CronjobStatus = 'active',
): Promise<Cronjob[]> => {
    const { data } = await api.get<ListResponse<Cronjob>>('/crud', {
        params: status === 'active' ? undefined : { status },
    });
    return data.data;
};

export const createCronjob = async (
    payload: CronjobPayload & { cron_expression: string },
): Promise<void> => {
    await api.post('/crud', payload);
};

export const updateCronjob = async (
    id: Id,
    payload: CronjobPayload,
): Promise<void> => {
    await api.put('/crud', { cronjob_id: id, ...payload });
};

// Soft-delete toggle: when the row is active it gets soft-deleted, when it's
// already trashed it's restored and `next_run_at` is recomputed server-side.
export const toggleCronjob = async (id: Id): Promise<void> => {
    await api.delete('/crud', { data: { cronjob_id: id } });
};

// Returns the next 40 firings of the given cron expression as a multi-line
// string (the controller method has a `inputCroExpression` typo we have to
// honour to avoid breaking the wire contract).
export const previewCronExpression = async (
    expression: string,
): Promise<string> => {
    const { data } = await api.post<ScalarResponse<string>>('/preview_job', {
        inputCroExpression: expression,
    });
    return data.data;
};

export const updateCronExpression = async (
    id: Id,
    expression: string,
): Promise<string> => {
    const { data } = await api.post<ScalarResponse<string>>(
        '/edit_cron_timer',
        { id, inputCroExpression: expression },
    );
    return data.data;
};

export const executeCronjob = async (id: Id): Promise<void> => {
    await api.post('/execute_job', { id });
};
