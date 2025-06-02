import { createFileRoute } from '@tanstack/react-router'
import Suppliers from '~/pages/parametros/suppliers'
import { useGetAllSuppliersQuery } from '~/queries/parametros/proveedor'

export const Route = createFileRoute('/_authenticated/parametros/proveedores')({
  component: Suppliers,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['suppliers'],
      queryFn: () => useGetAllSuppliersQuery({}),
    })
  },
})
