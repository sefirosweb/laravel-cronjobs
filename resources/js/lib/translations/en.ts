export const en = {
    nav: {
        appName: 'Cronjobs',
        cronjobs: 'Cronjobs',
        queue: 'Queue',
    },
    common: {
        save: 'Save changes',
        cancel: 'Cancel',
        confirm: 'Confirm',
        delete: 'Delete',
        close: 'Close',
        done: 'Done',
        search: 'Search...',
        noItems: 'No items.',
        sortByName: 'Name',
        sortBySelected: 'Assigned',
    },
    table: {
        showing: 'Showing',
        result: 'result',
        results: 'results',
        perPage: 'Per page',
        of: 'of',
    },
    cronjobs: {
        title: 'Cronjobs',
        subtitle: 'Scheduled tasks that fire according to their cron expression.',
        new: 'New cronjob',
        searchPlaceholder: 'Search by name or controller...',
        col: {
            name: 'Name',
            cron: 'Expression',
            nextRun: 'Next run',
            lastRun: 'Last run',
            status: 'Status',
            actions: 'Actions',
        },
        empty: {
            title: 'No cronjobs',
            description: 'Create your first cronjob to get started.',
        },
        emptyFiltered: {
            title: 'No results',
            description: 'Try another search term.',
        },
        status: {
            active: 'Active',
            all: 'All',
            deleted: 'Disabled',
            disabledBadge: 'Disabled',
            never: 'never',
        },
        actions: {
            edit: 'Edit',
            editCron: 'Edit cron expression',
            execute: 'Run now',
            disable: 'Disable',
            enable: 'Enable',
        },
        form: {
            createTitle: 'New cronjob',
            createSubtitle: 'Define a new scheduled task.',
            editTitle: 'Edit cronjob',
            editSubtitlePrefix: 'Editing',
            createBtn: 'Create cronjob',
            fields: {
                name: 'Name',
                namePlaceholder: 'e.g. send_daily_digest',
                description: 'Description',
                descriptionPlaceholder:
                    'e.g. Send the daily digest by email to administrators',
                function: 'Function',
                functionPlaceholder: 'e.g. handle',
                functionHelp:
                    'Public method invoked on the controller when the job runs.',
                controller: 'Controller',
                controllerPlaceholder: 'e.g. App\\Jobs\\SendDailyDigest',
                controllerHelp:
                    'FQCN of the controller / job that performs the task.',
                maxTries: 'Max tries',
                backoff: 'Backoff (s)',
                timeout: 'Timeout (s)',
            },
        },
        cronModal: {
            title: 'Edit cron expression',
            description:
                'Update the expression and preview the next firings.',
            input: 'Cron expression',
            previewTitle: 'Next 40 runs',
            previewError: 'Invalid expression.',
            previewLoading: 'Computing...',
            cheatSheet: 'Common shortcuts',
            saveBtn: 'Save expression',
        },
        executeConfirm: {
            title: 'Run now?',
            description:
                '"{{name}}" will be queued immediately, ignoring its next schedule.',
            confirm: 'Run',
        },
        disableConfirm: {
            title: 'Disable cronjob?',
            description:
                '"{{name}}" will stop running until you re-enable it.',
        },
        enableConfirm: {
            title: 'Enable cronjob?',
            description:
                '"{{name}}" will be re-enabled and its next run rescheduled.',
            confirm: 'Enable',
        },
        toast: {
            created: 'Cronjob "{{name}}" created.',
            updated: 'Cronjob updated.',
            disabled: 'Cronjob "{{name}}" disabled.',
            enabled: 'Cronjob "{{name}}" enabled.',
            executed: 'Cronjob "{{name}}" queued.',
            cronUpdated: 'Cron expression updated.',
        },
    },
    queue: {
        title: 'Queue',
        subtitle: "View of Laravel's queue (database driver).",
        empty: {
            title: 'View unavailable',
            description:
                'Queue inspection is not implemented in this package yet.',
        },
    },
} as const;
