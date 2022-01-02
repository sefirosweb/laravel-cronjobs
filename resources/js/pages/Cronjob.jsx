import { Crud } from '@sefirosweb/react-crud'

const Cronjob = () => {
    return (
        <>
            <h1>Cronjobs</h1>
            <Crud
                canDelete
                canEdit
                canRefresh
                canSearch
                createButtonTitle="Create Cronjob"
                crudUrl={`${APP_URL}/cronjobs/crud`}
                primaryKey="id"
                titleOnDelete="name"
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
                        type: 'text'
                    }
                ]}
            />
        </>
    );
}

export default Cronjob;