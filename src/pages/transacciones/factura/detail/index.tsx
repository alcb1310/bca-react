import { Box, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import InvoiceDetailsDrawer from '~/components/drawers/Transactions/InvoiceDetailsDrawer/InvoiceDetailsDrawer'
import InvoiceForm from '~/components/forms/Invoice/Invoice'
import AllDetailsTable from '~/components/parameters/invoices/AllDetailsTable/AllDetailsTable'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllInvoiceDetailsQuery } from '~/queries/transacciones/detalle'
import { useGetOneInvoiceQuery } from '~/queries/transacciones/facturas'
import EditToolbar from '~components/table/headers/toolbar'

export default function IndividualInvoice() {
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()
  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined)
  const { data: invoice, isFetching } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => useGetOneInvoiceQuery({ id: invoiceId! }),
    enabled: invoiceId !== undefined,
  })
  const { data } = useQuery({
    queryKey: ['details'],
    queryFn: () => useGetAllInvoiceDetailsQuery({ id: invoiceId! }),
    enabled: invoiceId !== undefined,
  })

  // const { data } = useGetAllInvoiceDetailsQuery({ id: invoiceId! })
  useEffect(() => {
    setInvoiceId(location.pathname.split('/')[3])
  }, [location])

  return (
    <>
      <PageTitle
        title={
          invoiceId?.toLowerCase() === 'crear'
            ? 'Crear Factura'
            : 'Editar Factura'
        }
      />

      {isFetching || !invoiceId ? (
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
