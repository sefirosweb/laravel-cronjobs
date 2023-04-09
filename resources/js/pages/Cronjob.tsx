import { Crud, PlayButton, Modal, EditButton, ColumnDefinition, CrudPropsRef, RestoreButton, CancelButton } from '@sefirosweb/react-crud'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import cron_expresion from '@/images/cron_expresion.gif'
import toastr from "toastr";
import axios from 'axios';
import { APP_URL } from '@/types/configurationType';

export const Cronjob = () => {

    const [primaryKey, setPrimaryKey] = useState<number>(null);
    const [inputCroExpresion, setInputCroExpresion] = useState('');
    const [previewCron, setPreviewCron] = useState('')
    const [rowData, setRowData] = useState<Cronjob | null>(null);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const crudRef = useRef<CrudPropsRef>(null);

    const handleModalShow = (row: Cronjob, key: number) => {
        setPrimaryKey(key)
        setRowData(row)
        setInputCroExpresion(row.cron_expression)
        setShow(true)
    }

    const handleAcceptModalCron = () => {
        setIsLoading(true)
        axios.post(`${APP_URL}/edit_cron_timer`, { inputCroExpresion, id: primaryKey })
            .then((request) => {
                const { success } = request.data
                if (success) {
                    setShow(false)
                }
            })
            .catch(error => console.log(error))
            .then(() => setIsLoading(false))
    }

    useEffect(() => {
        setPreviewCron('')
        if (inputCroExpresion === '') {
            return
        }

        const timer = setTimeout(() => {
            axios.post(`${APP_URL}/preview_job`, { inputCroExpresion })
                .then((request) => {
                    const responseData = request.data.data
                    const success = request.data.success
                    if (success) {
                        toastr.clear();
                        setPreviewCron(responseData)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setPreviewCron('#Error#')
                })
        }, 200)

        return () => { clearTimeout(timer) }
    }, [inputCroExpresion])

    const modalBody = (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Cronjob:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={rowData?.name} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cron Expresion</Form.Label>
                    <Form.Control type="text" value={inputCroExpresion} onChange={(e) => setInputCroExpresion(e.target.value)} readOnly={isLoading} />
                    <div className='w-100 mt-1'>
                        <img className='w-100' src={cron_expresion} alt='cronjob_expresion_image' />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Preview Next Run</Form.Label>
                    <Form.Control as="textarea" rows={5} value={previewCron} readOnly />
                </Form.Group>
            </Form>
        </>
    )

    const onExitModal = () => {
        crudRef.current.refreshTable()
        setInputCroExpresion('')
        setPreviewCron('')
    }

    const handlePlayCron = (row, key) => {
        crudRef.current.setIsLoading(true)
        axios.post(`${APP_URL}/execute_job`, { id: key })
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
            cell: row => <EditButton variant='warning' onClick={() => handleModalShow(row.cell.row.original, row.cell.row.original.id)}></EditButton>
        },
        {
            id: 'run_cron',
            header: 'Run Cron',
            cell: row => <PlayButton variant='warning' onClick={() => handlePlayCron(row.cell.row.original, row.cell.row.original.id)}></PlayButton>
        },
        {
            id: 'disable',
            header: 'Disable Cron',
            cell: props => props.cell.row.original.deleted_at ?
                <RestoreButton variant='success' onClick={() => handlePlayCron(props.cell.row.original, props.cell.row.original.id)}></RestoreButton> :
                <CancelButton variant='danger' onClick={() => handlePlayCron(props.cell.row.original, props.cell.row.original.id)}></CancelButton>
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

            <Modal
                show={show}
                setShow={setShow}
                accept='Accept'
                title={'Edit Cronjob'}
                body={modalBody}
                handleAccept={handleAcceptModalCron}
                isLoading={isLoading}
                onExited={onExitModal}
            />
        </>
    );
}
