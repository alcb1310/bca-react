import { createFileRoute } from '@tanstack/react-router'
import Historic from '~/pages/reportes/historic'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllLevelsQuery } from '~/queries/reportes/comun'

export const Route = createFileRoute('/_authenticated/reportes/historico')({
  component: Historic,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['projects'],
        queryFn: () => useGetAllProjectsQuery({}),
      }),
      queryClient.ensureQueryData({
        queryKey: ['levels'],
        queryFn: () => useGetAllLevelsQuery(),
      }),
    ])
  },
})
