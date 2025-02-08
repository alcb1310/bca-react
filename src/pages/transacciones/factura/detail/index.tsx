import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import PageTitle from '~components/titles/PageTitle'
import { useGetOneInvoiceQuery } from '~redux/api/bca-backend/transacciones/invoiceSlice'
import InvoiceForm from '~components/forms/Invoice'
import EditToolbar from '~components/table/headers/toolbar'
import AllDetailsTable from '~components/parameters/invoices/AllDetailsTable'
import { useGetAllInvoiceDetailsQuery } from '~redux/api/bca-backend/transacciones/invoiceDetailsSlice'
import InvoiceDetailsDrawer from '~/components/drawers/Transactions/InvoiceDetailsDrawer/InvoiceDetailsDrawer'

export default function IndividualInvoice() {
    const [open, setOpen] = useState<boolean>(false)
    const location = useLocation()
    const invoiceId = location.pathname.split('/')[3]
    const { data: invoice, isLoading } = useGetOneInvoiceQuery(invoiceId!)
    const { data } = useGetAllInvoiceDetailsQuery({ id: invoiceId! })

    return (
        <>
            <PageTitle
                title={
                    invoiceId?.toLowerCase() === 'crear'
                        ? 'Crear Factura'
                        : 'Editar Factura'
                }
            />

            {isLoading ? (
                <CircularProgress data-testid='page.transactions.invoice.details.loading' />
            ) : (
                <>
                    <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
                        <InvoiceForm invoiceId={invoiceId!} invoice={invoice!} />
                    </Box>

                    {invoiceId?.toLowerCase() !== 'crear' && (
                        <>
                            <EditToolbar
                                title='Agregar Detalle'
                                onClick={() => setOpen(true)}
                            />
                            <AllDetailsTable data={data!} invoiceId={invoiceId!} />
                            <InvoiceDetailsDrawer
                                open={open}
                                onClose={() => setOpen(false)}
                                invoiceId={invoiceId!}
                            />
                        </>
                    )}
                </>
            )}
        </>
    )
}
