import { APP_URL } from "@/types/configurationType";
import { CancelButton, CrudPropsRef, RestoreButton } from "@sefirosweb/react-crud";
import axios from "axios";
import React from "react";

type Props = {
    crudRef: React.MutableRefObject<CrudPropsRef>,
    cronjob: Cronjob
}

export const DisableButton = (props: Props) => {
    const { cronjob, crudRef } = props

    const handleDisable = () => {
        axios.delete(`${APP_URL}/crud`, {
            data: {
                cronjob_id: cronjob.id
            }
        })
            .then((request) => {
                const success = request.data.success
                if (success) {
                    crudRef.current.refreshTable()
                }
            })
    }

    return cronjob.deleted_at ?
        <RestoreButton variant='success' onClick={handleDisable}></RestoreButton> :
        <CancelButton variant='danger' onClick={handleDisable}></CancelButton>

}