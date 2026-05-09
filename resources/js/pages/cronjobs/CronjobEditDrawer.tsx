import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { Drawer } from '@/ui/Drawer';
import { Field } from '@/ui/Field';
import { TextInput } from '@/ui/TextInput';
import { Cronjob, CronjobPayload } from '@/types/store';

export type CronjobEditState =
    | null
    | { mode: 'create' }
    | { mode: 'edit'; cronjob: Cronjob };

interface Props {
    editing: CronjobEditState;
    onClose: () => void;
    onSave: (data: CronjobPayload & { cron_expression: string }) => void;
    busy?: boolean;
}

interface FormState {
    name: string;
    description: string;
    function: string;
    controller: string;
    cron_expression: string;
    backoff: string;
    max_tries: string;
    timeout: string;
}

const empty: FormState = {
    name: '',
    description: '',
    function: 'handle',
    controller: '',
    cron_expression: '* * * * *',
    backoff: '0',
    max_tries: '1',
    timeout: '60',
};

export const CronjobEditDrawer = ({
    editing,
    onClose,
    onSave,
    busy,
}: Props) => {
    const { t } = useTranslation();
    const [form, setForm] = useState<FormState>(empty);

    useEffect(() => {
        if (!editing) return;
        if (editing.mode === 'edit') {
            const c = editing.cronjob;
            setForm({
                name: c.name ?? '',
                description: c.description ?? '',
                function: c.function ?? '',
                controller: c.controller ?? '',
                cron_expression: c.cron_expression ?? '',
                backoff: String(c.backoff ?? 0),
                max_tries: String(c.max_tries ?? 1),
                timeout: String(c.timeout ?? 60),
            });
        } else {
            setForm(empty);
        }
    }, [editing]);

    const isEdit = editing?.mode === 'edit';

    const isValid = useMemo(() => {
        if (!editing) return false;
        if (form.name.trim().length < 3) return false;
        if (form.description.trim().length < 3) return false;
        if (form.function.trim().length < 3) return false;
        if (form.controller.trim().length < 3) return false;
        if (!isEdit && form.cron_expression.trim().length === 0) return false;
        return true;
    }, [editing, form, isEdit]);

    if (!editing) return null;

    const submit = () => {
        onSave({
            name: form.name.trim(),
            description: form.description.trim(),
            function: form.function.trim(),
            controller: form.controller.trim(),
            cron_expression: form.cron_expression.trim(),
            backoff: Number(form.backoff) || 0,
            max_tries: Math.max(1, Number(form.max_tries) || 1),
            timeout: Number(form.timeout) || 0,
        });
    };

    return (
        <Drawer
            open
            onClose={onClose}
            title={
                isEdit
                    ? t('cronjobs.form.editTitle')
                    : t('cronjobs.form.createTitle')
            }
            subtitle={
                isEdit
                    ? `${t('cronjobs.form.editSubtitlePrefix')} ${editing.cronjob.name}`
                    : t('cronjobs.form.createSubtitle')
            }
            footer={
                <>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={busy}
                    >
                        {t('common.cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!isValid || busy}
                        onClick={submit}
                    >
                        {isEdit
                            ? t('common.save')
                            : t('cronjobs.form.createBtn')}
                    </Button>
                </>
            }
        >
            <Field label={t('cronjobs.form.fields.name')}>
                <TextInput
                    autoFocus
                    placeholder={t('cronjobs.form.fields.namePlaceholder')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            </Field>
            <Field label={t('cronjobs.form.fields.description')}>
                <TextInput
                    placeholder={t(
                        'cronjobs.form.fields.descriptionPlaceholder',
                    )}
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </Field>
            <Field
                label={t('cronjobs.form.fields.controller')}
                help={t('cronjobs.form.fields.controllerHelp')}
            >
                <TextInput
                    className="mono"
                    placeholder={t(
                        'cronjobs.form.fields.controllerPlaceholder',
                    )}
                    value={form.controller}
                    onChange={(e) =>
                        setForm({ ...form, controller: e.target.value })
                    }
                />
            </Field>
            <Field
                label={t('cronjobs.form.fields.function')}
                help={t('cronjobs.form.fields.functionHelp')}
            >
                <TextInput
                    className="mono"
                    placeholder={t('cronjobs.form.fields.functionPlaceholder')}
                    value={form.function}
                    onChange={(e) =>
                        setForm({ ...form, function: e.target.value })
                    }
                />
            </Field>
            {!isEdit && (
                <Field label="Cron">
                    <TextInput
                        className="mono"
                        placeholder="* * * * *"
                        value={form.cron_expression}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                cron_expression: e.target.value,
                            })
                        }
                    />
                </Field>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <Field label={t('cronjobs.form.fields.maxTries')}>
                    <TextInput
                        type="number"
                        min={1}
                        value={form.max_tries}
                        onChange={(e) =>
                            setForm({ ...form, max_tries: e.target.value })
                        }
                    />
                </Field>
                <Field label={t('cronjobs.form.fields.backoff')}>
                    <TextInput
                        type="number"
                        min={0}
                        value={form.backoff}
                        onChange={(e) =>
                            setForm({ ...form, backoff: e.target.value })
                        }
                    />
                </Field>
                <Field label={t('cronjobs.form.fields.timeout')}>
                    <TextInput
                        type="number"
                        min={0}
                        value={form.timeout}
                        onChange={(e) =>
                            setForm({ ...form, timeout: e.target.value })
                        }
                    />
                </Field>
            </div>
        </Drawer>
    );
};
