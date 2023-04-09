import React, { useRef } from 'react'
import axios from 'axios';
import { Crud, PlayButton, ColumnDefinition, CrudPropsRef, RestoreButton, CancelButton, FieldTypes } from '@sefirosweb/react-crud'
import { APP_URL } from '@/types/configurationType';
import { EditCronButton } from './EditCronButton';

export const Cronjob = () => {
    const crudRef = useRef<CrudPropsRef>(null);

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
            header: 'Name',
            titleOnCRUD: 'Name',
            editable: true,
        },
        {
            accessorKey: 'description',
            titleOnCRUD: 'Description',
            header: 'Description',
            fieldType: FieldTypes.TEXTAREA,
            editable: true,
        },
        {
            accessorKey: 'function',
            titleOnCRUD: 'Function',
            header: 'Function',
            editable: true,
        },
        {
            accessorKey: 'controller',
            titleOnCRUD: 'Controller',
            header: 'Controller',
            editable: true,
        },
        {
            accessorKey: 'last_run_at',
            header: 'Last Run',
        },
        {
            accessorKey: 'next_run_at',
            header: 'Next Run',
        },
        {
            id: 'edit_cron',
            header: 'Edit Cron',
            cell: (props) => <EditCronButton crudRef={crudRef} cronjob={props.cell.row.original} />
        },
        {
            id: 'run_cron',
            header: 'Run Cron',
            cell: row => <PlayButton variant='warning' onClick={() => handlePlayCron(row.cell.row.original.id)}></PlayButton>
        },
        {
            id: 'disable',
            header: 'Disable Cron',
            cell: props => props.cell.row.original.deleted_at ?
                <RestoreButton variant='success' onClick={() => handlePlayCron(props.cell.row.original.id)}></RestoreButton> :
                <CancelButton variant='danger' onClick={() => handlePlayCron(props.cell.row.original.id)}></CancelButton>
        }
    ]

    return (
        <>
            <h1>Cronjobs</h1>
            <Crud
                canEdit
                canRefresh
                createButtonTitle="Create Cronjob"
                crudUrl={`${APP_URL}/crud`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
            />
        </>
    );
}
