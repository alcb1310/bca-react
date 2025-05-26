import { Box, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import InvoiceDetailsDrawer from '~/components/drawers/Transactions/InvoiceDetailsDrawer/InvoiceDetailsDrawer'
import InvoiceForm from '~/components/forms/Invoice/Invoice'
import AllDetailsTable from '~/components/parameters/invoices/AllDetailsTable/AllDetailsTable'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetOneInvoiceQuery } from '~/queries/transacciones/facturas'
import { useAppSelector } from '~/redux/hooks'
import EditToolbar from '~components/table/headers/toolbar'
import { useGetAllInvoiceDetailsQuery } from '~redux/api/bca-backend/transacciones/invoiceDetailsSlice'

export default function IndividualInvoice() {
  const token = useAppSelector((state) => state.login.token)
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()
  const invoiceId = location.pathname.split('/')[3]
  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => useGetOneInvoiceQuery({ token, id: invoiceId! }),
  })
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
