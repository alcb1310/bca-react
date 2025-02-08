import { useState } from 'react'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'
import { EditOutlined } from '@mui/icons-material'

import { SupplierType } from '~types/supplier'
import SupplierDrawer from '~components/drawers/Settings/Suppliers/SupplierDrawer'

type AllSuppliersTableProps = {
    data: SupplierType[]
}

export default function AllSuppliersTable({ data }: AllSuppliersTableProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierType | null>(
        null
    )

    const cols: GridColDef<SupplierType>[] = [
        { field: 'supplier_id', headerName: 'RUC', width: 130 },
        { field: 'name', headerName: 'Nombre', width: 270 },
        {
            field: 'contact_name',
            headerName: 'Nombre Contacto',
            width: 200,
            // @ts-expect-error String is a property of the object
            valueGetter: (row) => row.String,
        },
        {
            field: 'contact_email',
            headerName: 'Email Contacto',
            width: 200,
            // @ts-expect-error String is a property of the object
            valueGetter: (row) => row.String,
        },
        {
            field: 'contact_phone',
            headerName: 'Telefono Contacto',
            width: 200,
            // @ts-expect-error String is a property of the object
            valueGetter: (row) => row.String,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 10,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon=<EditOutlined color='warning' />
                    label='Edit'
                    onClick={() => {
                        EditSupplier(params.row)
                    }}
                />,
            ],
        },
    ]

    function EditSupplier(params: SupplierType) {
        const data: SupplierType = {
            id: params.id,
            supplier_id: params.supplier_id,
            name: params.name,
        }
        // @ts-expect-error String is a property of the object
        data.contact_name = params.contact_name.String
        // @ts-expect-error String is a property of the object
        data.contact_email = params.contact_email.String
        // @ts-expect-error String is a property of the object
        data.contact_phone = params.contact_phone.String

        setSelectedSupplier(data)
        setOpen(true)
    }

    return (
        <>
            <DataGrid
                rows={data}
                columns={cols}
                getRowId={(row) => row.id!}
                rowHeight={25}
                disableColumnFilter
                disableColumnResize
                disableRowSelectionOnClick
                disableMultipleRowSelection
                sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25,
                        },
                    },
                }}
            />

            {open && (
                <SupplierDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    defaultValues={selectedSupplier!}
                />
            )}
        </>
    )
}
