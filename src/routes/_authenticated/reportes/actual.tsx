import { createFileRoute } from '@tanstack/react-router'
import Actual from '~/pages/reportes/actual'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllLevelsQuery } from '~/queries/reportes/comun'

export const Route = createFileRoute('/_authenticated/reportes/actual')({
  component: Actual,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['projects', 'active'],
        queryFn: () => useGetAllProjectsQuery({ active: true }),
      }),
      queryClient.ensureQueryData({
        queryKey: ['levels'],
        queryFn: () => useGetAllLevelsQuery(),
      }),
    ])
  },
})
