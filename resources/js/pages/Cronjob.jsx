import { Crud, EditButton, PlayButton, Modal } from '@sefirosweb/react-crud'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import cron_expresion from '@/images/cron_expresion.gif'
import toastr from "toastr";

const Cronjob = () => {

    const [primaryKey, setPrimaryKey] = useState('');
    const [inputCroExpresion, setInputCroExpresion] = useState('');
    const [previewCron, setPreviewCron] = useState('')
    const [rowData, setRowData] = useState('');
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const crudRef = useRef();

    const handleModalShow = (row, key) => {
        setPrimaryKey(key)
        setRowData(row)
        setInputCroExpresion(row['cron_expression'])
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
                        <Form.Control plaintext readOnly defaultValue={rowData.name} />
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
        crudRef.current.setIsLoadingTable(true)
        axios.post(`${APP_URL}/execute_job`, { id: key })
            .then(() => {
                crudRef.current.setIsLoadingTable(false)
            })
            .catch(() => crudRef.current.setIsLoadingTable(false))
    }

    return (
        <>
            <h1>Cronjobs</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                canSearch
                createButtonTitle="Create Cronjob"
                crudUrl={`${APP_URL}/crud`}
                primaryKey="id"
                titleOnDelete="name"
                ref={crudRef}
                columns={[
                    {
                        Header: '#',
                        accessor: 'id',
                        sortable: true,
                        visible: true
                    },
                    {
                        accessor: 'name',
                        Header: 'Name',
                        titleOnCRUD: 'Name',
                        editable: true,
                        sortable: true,
                    },
                    {
                        accessor: 'description',
                        titleOnCRUD: 'Description',
                        Header: 'Description',
                        editable: true,
                        sortable: true,
                        type: 'textarea'
                    },
                    {
                        accessor: 'function',
                        titleOnCRUD: 'Function',
                        Header: 'Function',
                        editable: true,
                        sortable: true,
                        type: 'text'
                    },
                    {
                        accessor: 'controller',
                        titleOnCRUD: 'Controller',
                        Header: 'Controller',
                        editable: true,
                        sortable: true,
                        type: 'text'
                    },
                    {
                        accessor: 'last_run_at',
                        Header: 'Last Run',
                        sortable: true
                    },
                    {
                        accessor: 'next_run_at',
                        Header: 'Next Run',
                        sortable: true
                    },
                    {
                        Header: 'Edit Cron',
                        accessor: 'edit_cron',
                        Cell: row => <EditButton onClick={() => handleModalShow(row.cell.row.original, row.cell.row.original.id)}></EditButton>
                    },
                    {
                        Header: 'Run Cron',
                        accessor: 'run_cron',
                        Cell: row => <PlayButton onClick={() => handlePlayCron(row.cell.row.original, row.cell.row.original.id)}></PlayButton>
                    }
                ]}
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

export default Cronjob;