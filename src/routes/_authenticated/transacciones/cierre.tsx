import { createFileRoute } from '@tanstack/react-router'
import Cierre from '~/pages/transacciones/cierre'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'

export const Route = createFileRoute('/_authenticated/transacciones/cierre')({
  component: Cierre,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['projects', 'active'],
        queryFn: () => useGetAllProjectsQuery({ active: true }),
      }),
    ])
  },
})
