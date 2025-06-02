import { createFileRoute } from '@tanstack/react-router'
import Items from '~/pages/parametros/items'
import { useGetAllRubrosQuery } from '~/queries/parametros/rubros'

export const Route = createFileRoute('/_authenticated/parametros/rubros')({
  component: Items,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['items'],
      queryFn: () => useGetAllRubrosQuery(),
    })
  },
})
