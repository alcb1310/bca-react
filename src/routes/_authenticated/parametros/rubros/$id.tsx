import { createFileRoute } from '@tanstack/react-router'
import IndividualItem from '~/pages/parametros/items/detail'
import { useGetOneRubroQuery } from '~/queries/parametros/rubros'

export const Route = createFileRoute('/_authenticated/parametros/rubros/$id')({
  component: IndividualItem,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await queryClient.ensureQueryData({
      queryKey: ['rubro', id],
      queryFn: () => useGetOneRubroQuery({ id }),
    })

    return { rubroId: id }
  },
})
