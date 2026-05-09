import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createCronjob,
    executeCronjob,
    fetchCronjobs,
    previewCronExpression,
    toggleCronjob,
    updateCronExpression,
    updateCronjob,
} from '@/api/cronjobs';
import { Cronjob, CronjobPayload, CronjobStatus, Id } from '@/types/store';

const cronjobsKey = (status: CronjobStatus = 'active') =>
    ['cronjobs', status] as const;

export const useCronjobs = (status: CronjobStatus = 'active') =>
    useQuery({
        queryKey: cronjobsKey(status),
        queryFn: () => fetchCronjobs(status),
    });

export const useCreateCronjob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CronjobPayload & { cron_expression: string }) =>
            createCronjob(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['cronjobs'] }),
    });
};

export const useUpdateCronjob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: Id; payload: CronjobPayload }) =>
            updateCronjob(id, payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['cronjobs'] }),
    });
};

// Optimistic disable/enable: flip `deleted_at` in cache immediately so the
// row's appearance (opacity + badge + button) updates without waiting for
// the refetch. Rolls back on error.
export const useToggleCronjob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: Id) => toggleCronjob(id),
        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: ['cronjobs'] });
            const snapshots = qc.getQueriesData<Cronjob[]>({
                queryKey: ['cronjobs'],
            });
            qc.setQueriesData<Cronjob[]>({ queryKey: ['cronjobs'] }, (prev) =>
                (prev ?? []).map((row) =>
                    row.id === id
                        ? {
                              ...row,
                              deleted_at: row.deleted_at
                                  ? null
                                  : new Date().toISOString(),
                              next_run_at: row.deleted_at
                                  ? row.next_run_at
                                  : null,
                          }
                        : row,
                ),
            );
            return { snapshots };
        },
        onError: (_err, _id, ctx) => {
            ctx?.snapshots.forEach(([key, data]) => qc.setQueryData(key, data));
        },
        onSettled: () => qc.invalidateQueries({ queryKey: ['cronjobs'] }),
    });
};

export const useExecuteCronjob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: Id) => executeCronjob(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['cronjobs'] }),
    });
};

export const useUpdateCronExpression = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, expression }: { id: Id; expression: string }) =>
            updateCronExpression(id, expression),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['cronjobs'] }),
    });
};

export const usePreviewCronExpression = (expression: string) =>
    useQuery({
        queryKey: ['cron-preview', expression] as const,
        queryFn: () => previewCronExpression(expression),
        enabled: expression.trim().length > 0,
        staleTime: 30_000,
        retry: false,
    });
