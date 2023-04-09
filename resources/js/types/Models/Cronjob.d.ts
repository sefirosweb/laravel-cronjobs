type Cronjob = {
    id: number;
    name: string;
    description: string;
    function: string;
    controller: string;
    cron_expression: string;
    message: string;
    last_run_at: string /* Date */ | null;
    next_run_at: string /* Date */ | null;
    deleted_at: string /* Date */ | null;
    created_at?: any;
    updated_at?: any;
}
