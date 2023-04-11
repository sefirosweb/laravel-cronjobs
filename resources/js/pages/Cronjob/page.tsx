import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import toastr from "toastr";
import { Crud, PlayButton, ColumnDefinition, CrudPropsRef, FieldTypes } from '@sefirosweb/react-crud'
import { APP_URL } from '@/types/configurationType';
import { EditCronButton } from './EditCronButton';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'react-bootstrap';
import { DisableButton } from './DisableButton';

export const Cronjob = () => {
    const crudRef = useRef<CrudPropsRef>(null);
    const [filters, setFilters] = useState("active");

    const { t } = useTranslation()
    const customFilters = (
        <Row>
            <Col sm={12} md={'auto'} className='mt-3'>
                <Form.Select
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                >
                    <option value="active">{t('Active')}</option>
                    <option value="all">{t('All')}</option>
                    <option value="deleted">{t('Deleted')}</option>
                </Form.Select>
            </Col>
        </Row>
    )

    useEffect(() => {
        crudRef.current.setLazyilters({ status: filters });
    }, [filters])

    const handlePlayCron = (id: number) => {
        crudRef.current.setIsLoading(true)
        axios.post(`${APP_URL}/execute_job`, {
            id
        })
            .then((request) => {
                const { success } = request.data
                if (success) {
                    crudRef.current.refreshTable()
                    toastr.info('Job dispatched!');
                }
            })
            .finally(() => crudRef.current.setIsLoading(false))
    }

    const columns: Array<ColumnDefinition<Cronjob>> = [
        {
            accessorKey: 'id',
            header: '#',
            visible: false
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
            cell: props => {
                const controller = props.cell.row.original.controller
                const splited = controller.split('\\')

                return (
                    <div onClick={() => navigator.clipboard.writeText(controller).then(() => toastr.info('Copied to clipboard'))} style={{
                        cursor: 'pointer',
                        color: 'blue'
                    }}>
                        {splited.map((p, key) => <div key={key}>{p}{splited.length - 1 === key ? <></> : <>\</>}</div>)}
                    </div>
                )
            }
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
            accessorKey: 'message'
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
            cell: props => <DisableButton cronjob={props.cell.row.original} crudRef={crudRef} />
        }
    ]

    return (
        <>
            <h1>{t('TitleCron')}</h1>
            <Crud
                canEdit
                canRefresh
                enableGlobalFilter
                createButtonTitle={t('CreateCron')}
                crudUrl={`${APP_URL}/crud`}
                primaryKey="id"
                sentKeyAs='cronjob_id'
                titleOnDelete="name"
                ref={crudRef}
                columns={columns}
                customButtons={customFilters}
            />
        </>
    );
}
