import { createFileRoute } from '@tanstack/react-router'
import IndividualInvoice from '~/pages/transacciones/factura/detail'
import { useGetAllInvoiceDetailsQuery } from '~/queries/transacciones/detalle'
import { useGetOneInvoiceQuery } from '~/queries/transacciones/facturas'

export const Route = createFileRoute(
  '/_authenticated/transacciones/facturas/$id',
)({
  component: IndividualInvoice,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['details'],
        queryFn: () => useGetAllInvoiceDetailsQuery({ id }),
      }),
      queryClient.ensureQueryData({
        queryKey: ['invoice', id],
        queryFn: () => useGetOneInvoiceQuery({ id }),
      }),
    ])
    return { invoiceId: id }
  },
})
