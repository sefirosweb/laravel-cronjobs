import React, { useRef } from 'react'
import axios from 'axios';
import { Crud, PlayButton, ColumnDefinition, CrudPropsRef, RestoreButton, CancelButton, FieldTypes } from '@sefirosweb/react-crud'
import { APP_URL } from '@/types/configurationType';
import { EditCronButton } from './EditCronButton';
import { useTranslation } from 'react-i18next';

export const Cronjob = () => {
    const crudRef = useRef<CrudPropsRef>(null);

    const { t } = useTranslation()

    const handlePlayCron = (id: number) => {
        crudRef.current.setIsLoading(true)
        axios.post(`${APP_URL}/execute_job`, {
            id
        })
            .then(() => {
                crudRef.current.setIsLoading(false)
            })
            .catch(() => crudRef.current.setIsLoading(false))
    }

    const columns: Array<ColumnDefinition<Cronjob>> = [
        {
            accessorKey: 'id',
            header: '#',
            visible: true
        },
        {
            accessorKey: 'name',
            header: t('Name'),
            titleOnCRUD: t('Name'),
            editable: true,
        },
        {
            accessorKey: 'description',
            titleOnCRUD: t('Description'),
            header: t('Description'),
            fieldType: FieldTypes.TEXTAREA,
            editable: true,
        },
        {
            accessorKey: 'function',
            titleOnCRUD: t('Function'),
            header: t('Function'),
            editable: true,
        },
        {
            accessorKey: 'controller',
            titleOnCRUD: t('Controller'),
            header: t('Controller'),
            editable: true,
        },
        {
            accessorKey: 'last_run_at',
            header: t('LastRun'),
        },
        {
            accessorKey: 'next_run_at',
            header: t('NextRun'),
        },
        {
            id: 'edit_cron',
            header: t('EditCron'),
            cell: props => <EditCronButton crudRef={crudRef} cronjob={props.cell.row.original} />
        },
        {
            id: 'run_cron',
            header: t('RunCron'),
            cell: props => <PlayButton variant='warning' onClick={() => handlePlayCron(props.cell.row.original.id)}></PlayButton>
        },
        {
            id: 'disable',
            header: t('DisableCron'),
            cell: props => props.cell.row.original.deleted_at ?
                <RestoreButton variant='success' onClick={() => handlePlayCron(props.cell.row.original.id)}></RestoreButton> :
                <CancelButton variant='danger' onClick={() => handlePlayCron(props.cell.row.original.id)}></CancelButton>
        }
    ]

    return (
        <>
            <h1>{t('TitleCron')}</h1>
            <Crud
                canEdit
                canRefresh
                createButtonTitle={t('CreateCron')}
                crudUrl={`${APP_URL}/crud`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
            />
        </>
    );
}
