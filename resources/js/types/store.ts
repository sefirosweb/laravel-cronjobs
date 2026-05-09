export type Id = number;

export interface Cronjob {
    id: Id;
    name: string;
    description: string;
    function: string;
    controller: string;
    cron_expression: string;
    message: string;
    max_tries: number;
    backoff: number;
    timeout: number;
    last_run_at: string | null;
    next_run_at: string | null;
    deleted_at: string | null;
}

export type CronjobStatus = 'active' | 'all' | 'deleted';

// Mass-assignable fields the host can edit through the create/edit drawer.
// `cron_expression` is excluded — it has its own dedicated modal so the user
// can preview the next firings before saving.
export interface CronjobPayload {
    name: string;
    description: string;
    function: string;
    controller: string;
    backoff: number;
    max_tries: number;
    timeout: number;
}

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}
