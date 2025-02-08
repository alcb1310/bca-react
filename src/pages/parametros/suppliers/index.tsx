import { useState } from 'react'
import { CircularProgress, Grid2, TextField } from '@mui/material'

import AllSuppliersTable from '~components/settings/suppliers/AllSuppliersTable'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllSuppliersQuery } from '~redux/api/bca-backend/parametros/supplierSlice'
import EditToolbar from '~components/table/headers/toolbar'
import SupplierDrawer from '~components/drawers/Settings/Suppliers/SupplierDrawer'

export default function Suppliers() {
    const [query, setQuery] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const { data, isLoading } = useGetAllSuppliersQuery({ search: query })

    return (
        <>
            <PageTitle title='Proveedores' />

            {isLoading && (
                <CircularProgress data-testid='page.parameters.suppliers.loading' />
            )}

            <Grid2 container spacing={2}>
                <Grid2 size={2}>
                    <EditToolbar title='Crear Proveedor' onClick={() => setOpen(true)} />
                </Grid2>

                <Grid2 size={10}>
                    <TextField
                        label='Buscar'
                        data-testid='page.parameters.suppliers.search'
                        name='query'
                        size='small'
                        className='w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    '
                </Grid2>
            </Grid2>

            <AllSuppliersTable data={data!} />

            <SupplierDrawer
                open={open}
                onClose={() => setOpen(false)}
                defaultValues={{
                    supplier_id: '',
                    name: '',
                }}
            />
        </>
    )
}
