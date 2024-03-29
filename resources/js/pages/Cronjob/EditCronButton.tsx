import { CrudPropsRef, EditButton, Modal } from "@sefirosweb/react-crud";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import cron_expression from '@/images/cron_expression.gif'
import axios from "axios";
import toastr from "toastr";
import { APP_URL } from "@/types/configurationType";
import { useTranslation } from "react-i18next";

type Props = {
    crudRef: React.MutableRefObject<CrudPropsRef>,
    cronjob: Cronjob
}

export const EditCronButton = (props: Props) => {
    const { crudRef, cronjob } = props
    const { t } = useTranslation()

    const [show, setShow] = useState(false);
    const [inputCroExpression, setInputCroExpression] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [previewCron, setPreviewCron] = useState('')

    useEffect(() => {
        setPreviewCron('')
        if (inputCroExpression === '') {
            return
        }

        const timer = setTimeout(() => {
            axios.post(`${APP_URL}/preview_job`, { inputCroExpression })
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
    }, [inputCroExpression])

    const handleModalShow = () => {
        setInputCroExpression(cronjob.cron_expression)
        setShow(true)
    }

    const onExitModal = () => {
        setInputCroExpression('')
        setPreviewCron('')
    }

    const handleAcceptModalCron = () => {
        setIsLoading(true)
        axios.post(`${APP_URL}/edit_cron_timer`, {
            id: cronjob.id,
            inputCroExpression,
        })
            .then((request) => {
                const { success } = request.data
                if (success) {
                    crudRef.current.refreshTable()
                    setShow(false)
                }
            })
            .finally(() => setIsLoading(false))
    }

    const modalBody = (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        {t('Name')}:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={cronjob.name} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('CronExpression')}</Form.Label>
                    <Form.Control type="text" value={inputCroExpression} onChange={(e) => setInputCroExpression(e.target.value)} readOnly={isLoading} />
                    <div className='w-100 mt-1'>
                        <img className='w-100' src={cron_expression} alt='cronjob_expresison_image' />
                    </div>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>{t('PreviewNextRun')}</Form.Label>
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
                title={t('EditCron')}
                body={modalBody}
                handleAccept={handleAcceptModalCron}
                isLoading={isLoading}
                onExited={onExitModal}
            />
        </>
    )
}