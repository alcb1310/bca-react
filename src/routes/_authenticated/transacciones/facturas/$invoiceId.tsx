import IndividualInvoice from '@/pages/transacciones/factura/detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transacciones/facturas/$invoiceId',
)({
  component: IndividualInvoice,
  loader: ({ params: { invoiceId } }) => {
    return { invoiceId }
  },
})
