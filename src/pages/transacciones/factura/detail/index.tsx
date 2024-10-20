import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import PageTitle from '../../../../components/titles/PageTitle'
import { useGetOneInvoiceQuery } from '../../../../redux/api/bca-backend/transacciones/invoiceSlice'
import InvoiceForm from '../../../../components/forms/Invoice'
import EditToolbar from '../../../../components/table/headers/toolbar'
import AllDetailsTable from '../../../../components/parameters/invoices/AllDetailsTable'
import { useGetAllInvoiceDetailsQuery } from '../../../../redux/api/bca-backend/transacciones/invoiceDetailsSlice'
import InvoiceDetailsDrawer from '../../../../components/drawers/Transactions/InvoiceDetailsDrawer'

export default function IndividualInvoice() {
  const [open, setOpen] = useState<boolean>(false)
  const { invoiceId } = useParams()
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
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
            <InvoiceForm invoiceId={invoiceId!} invoice={invoice!} />
          </Box>

          <EditToolbar title='Agregar Detalle' onClick={() => setOpen(true)} />
          <AllDetailsTable data={data!} />
          <InvoiceDetailsDrawer
            open={open}
            onClose={() => setOpen(false)}
            invoiceId={invoiceId!}
          />
        </>
      )}
    </>
  )
}
