export const es = {
    nav: {
        appName: 'Cronjobs',
        cronjobs: 'Cronjobs',
        queue: 'Cola',
        backToApp: 'Volver a la app',
    },
    footer: {
        builtBy: 'Hecho por',
        viewSource: 'Ver código en GitHub',
    },
    common: {
        save: 'Guardar cambios',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        delete: 'Eliminar',
        close: 'Cerrar',
        done: 'Hecho',
        search: 'Buscar...',
        noItems: 'No hay elementos.',
        sortByName: 'Nombre',
        sortBySelected: 'Asignados',
    },
    table: {
        showing: 'Mostrando',
        result: 'resultado',
        results: 'resultados',
        perPage: 'Por página',
        of: 'de',
    },
    cronjobs: {
        title: 'Cronjobs',
        subtitle: 'Tareas programadas que se disparan según su expresión cron.',
        new: 'Nuevo cronjob',
        searchPlaceholder: 'Buscar por nombre o controller...',
        col: {
            name: 'Nombre',
            cron: 'Expresión',
            nextRun: 'Próxima',
            lastRun: 'Última',
            status: 'Estado',
            actions: 'Acciones',
        },
        empty: {
            title: 'Sin cronjobs',
            description: 'Crea tu primer cronjob para empezar.',
        },
        emptyFiltered: {
            title: 'Ningún resultado',
            description: 'Prueba con otro término de búsqueda.',
        },
        status: {
            active: 'Activos',
            all: 'Todos',
            deleted: 'Desactivados',
            disabledBadge: 'Desactivado',
            never: 'nunca',
        },
        actions: {
            edit: 'Editar',
            editCron: 'Editar expresión cron',
            execute: 'Ejecutar ahora',
            disable: 'Desactivar',
            enable: 'Activar',
        },
        form: {
            createTitle: 'Nuevo cronjob',
            createSubtitle: 'Define una nueva tarea programada.',
            editTitle: 'Editar cronjob',
            editSubtitlePrefix: 'Editando',
            createBtn: 'Crear cronjob',
            fields: {
                name: 'Nombre',
                namePlaceholder: 'ej. send_daily_digest',
                description: 'Descripción',
                descriptionPlaceholder:
                    'ej. Envía el resumen diario por email a los administradores',
                function: 'Función',
                functionPlaceholder: 'ej. handle',
                functionHelp:
                    'Método público invocado en el controller cuando el job se ejecuta.',
                controller: 'Controller',
                controllerPlaceholder: 'ej. App\\Jobs\\SendDailyDigest',
                controllerHelp: 'FQCN del controller / job que ejecuta la tarea.',
                maxTries: 'Reintentos',
                backoff: 'Backoff (s)',
                timeout: 'Timeout (s)',
            },
        },
        cronModal: {
            title: 'Editar expresión cron',
            description:
                'Modifica la expresión y previsualiza las próximas ejecuciones.',
            input: 'Expresión cron',
            previewTitle: 'Próximas 40 ejecuciones',
            previewError: 'Expresión inválida.',
            previewLoading: 'Calculando...',
            cheatSheet: 'Atajos comunes',
            saveBtn: 'Guardar expresión',
        },
        executeConfirm: {
            title: '¿Ejecutar ahora?',
            description:
                'Se encolará "{{name}}" inmediatamente, ignorando su próxima programación.',
            confirm: 'Ejecutar',
        },
        disableConfirm: {
            title: '¿Desactivar cronjob?',
            description:
                '"{{name}}" dejará de ejecutarse hasta que vuelva a activarse.',
        },
        enableConfirm: {
            title: '¿Activar cronjob?',
            description:
                'Se reactivará "{{name}}" y se reprogramará su próxima ejecución.',
            confirm: 'Activar',
        },
        toast: {
            created: 'Cronjob "{{name}}" creado.',
            updated: 'Cronjob actualizado.',
            disabled: 'Cronjob "{{name}}" desactivado.',
            enabled: 'Cronjob "{{name}}" activado.',
            executed: 'Cronjob "{{name}}" encolado.',
            cronUpdated: 'Expresión cron actualizada.',
        },
    },
    queue: {
        title: 'Cola de jobs',
        subtitle: 'Vista de la cola de Laravel (database driver).',
        empty: {
            title: 'Vista no disponible',
            description:
                'La inspección de la cola aún no está implementada en este paquete.',
        },
    },
} as const;
