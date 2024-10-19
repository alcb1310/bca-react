import { useParams } from 'react-router-dom'
import PageTitle from '../../../../components/titles/PageTitle'
import { useGetOneInvoiceQuery } from '../../../../redux/api/bca-backend/transacciones/invoiceSlice'
import { Box, CircularProgress } from '@mui/material'
import InvoiceForm from '../../../../components/forms/Invoice'

export default function IndividualInvoice() {
  const { invoiceId } = useParams()
  const { data: invoice, isLoading } = useGetOneInvoiceQuery(invoiceId!)

  return (
    <>
      <PageTitle title={invoiceId?.toLowerCase() === 'crear' ? 'Crear Factura' : 'Editar Factura'} />

      {isLoading ? <CircularProgress /> : (
        <>
          <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
            <InvoiceForm invoiceId={invoiceId!} invoice={invoice!} />
          </Box>
        </>
      )}
    </>
  )
}
