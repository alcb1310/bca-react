import { createFileRoute } from '@tanstack/react-router'
import Spent from '~/pages/reportes/spent'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllLevelsQuery } from '~/queries/reportes/comun'

export const Route = createFileRoute(
  '/_authenticated/reportes/gastado-por-partida',
)({
  component: Spent,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['levels'],
        queryFn: () => useGetAllLevelsQuery(),
      }),
      queryClient.ensureQueryData({
        queryKey: ['projects'],
        queryFn: () => useGetAllProjectsQuery({}),
      }),
    ])
  },
})
