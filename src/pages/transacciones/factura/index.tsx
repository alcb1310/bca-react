import AllInvoicesTable from '@/components/parameters/invoices/AllInvoicesTable'
import EditToolbar from '@/components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle'
import { useGetAllInvoicesQuery } from '@/queries/transacciones/factura'
import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export default function Factura() {
    const { data, isLoading } = useQuery({
        queryKey: ['facturas'],
        queryFn: () => useGetAllInvoicesQuery(),
    })
    const navigate = useNavigate()

    return (
        <>
            <PageTitle title='Facturas' />

            <EditToolbar
                title='Crear Factura'
                onClick={() =>
                    navigate({
                        to: '/transacciones/facturas/$invoiceId',
                        params: { invoiceId: 'crear' },
                    })
                }
            />
            {isLoading && (
                <CircularProgress data-testid='page.transactions.invoice.loading' />
            )}

            <AllInvoicesTable data={data!} />
        </>
    )
}
