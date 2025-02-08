import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import AllInvoicesTable from '~components/parameters/invoices/AllInvoicesTable'
import EditToolbar from '~components/table/headers/toolbar'
import PageTitle from '~components/titles/PageTitle'
import { useGetAllInvoicesQuery } from '~redux/api/bca-backend/transacciones/invoiceSlice'

export default function Factura() {
    const { data, isLoading } = useGetAllInvoicesQuery()
    const navigate = useNavigate()

    return (
        <>
            <PageTitle title='Facturas' />

            <EditToolbar
                title='Crear Factura'
                onClick={() => navigate('/transacciones/facturas/crear')}
            />
            {isLoading && (
                <CircularProgress data-testid='page.transactions.invoice.loading' />
            )}

            <AllInvoicesTable data={data!} />
        </>
    )
}
