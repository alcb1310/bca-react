import { createFileRoute } from '@tanstack/react-router'
import Materials from '~/pages/parametros/materials'
import { useGetAllMaterialsQuery } from '~/queries/parametros/materiales'

export const Route = createFileRoute('/_authenticated/parametros/materiales')({
  component: Materials,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['materials'],
      queryFn: () => useGetAllMaterialsQuery(),
    })
  },
})
