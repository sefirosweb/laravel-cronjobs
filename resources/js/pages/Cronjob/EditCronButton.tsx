import { CrudPropsRef, EditButton, Modal } from "@sefirosweb/react-crud";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import cron_expresion from '@/images/cron_expresion.gif'
import axios from "axios";
import toastr from "toastr";
import { APP_URL } from "@/types/configurationType";

type Props = {
    crudRef: React.MutableRefObject<CrudPropsRef>,
    cronjob: Cronjob
}

export const EditCronButton = (props: Props) => {
    const { crudRef, cronjob } = props

    const [show, setShow] = useState(false);
    const [inputCroExpresion, setInputCroExpresion] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [previewCron, setPreviewCron] = useState('')

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

    const handleModalShow = () => {
        setInputCroExpresion(cronjob.cron_expression)
        setShow(true)
    }

    const onExitModal = () => {
        setInputCroExpresion('')
        setPreviewCron('')
    }

    const handleAcceptModalCron = () => {
        setIsLoading(true)
        axios.post(`${APP_URL}/edit_cron_timer`, {
            id: cronjob.id,
            inputCroExpresion,
        })
            .then((request) => {
                const { success } = request.data
                if (success) {
                    crudRef.current.refreshTable()
                    setShow(false)
                }
            })
            .then(() => setIsLoading(false))
    }

    const modalBody = (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Cronjob:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={cronjob.name} />
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

    return (
        <>
            <EditButton variant='warning' onClick={handleModalShow}></EditButton>
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
    )
}