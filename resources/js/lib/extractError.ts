export const extractError = (err: unknown): string => {
    if (err && typeof err === 'object' && 'response' in err) {
        const r = (err as { response?: { data?: { message?: string } } })
            .response;
        if (r?.data?.message) return r.data.message;
    }
    return 'Error';
};
