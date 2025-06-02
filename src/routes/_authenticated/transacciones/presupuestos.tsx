import { createFileRoute } from '@tanstack/react-router'
import Presupuesto from '~/pages/transacciones/presupuesto'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllBudgetsQuery } from '~/queries/transacciones/presupuesto'

export const Route = createFileRoute(
  '/_authenticated/transacciones/presupuestos',
)({
  component: Presupuesto,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['budget'],
        queryFn: () => useGetAllBudgetsQuery({}),
      }),
      queryClient.prefetchQuery({
        queryKey: ['projects', 'active'],
        queryFn: () => useGetAllProjectsQuery({ active: true }),
      }),
    ])
  },
})
