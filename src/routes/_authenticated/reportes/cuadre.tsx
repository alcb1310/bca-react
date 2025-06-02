import { createFileRoute } from '@tanstack/react-router'
import Balance from '~/pages/reportes/balance'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'

export const Route = createFileRoute('/_authenticated/reportes/cuadre')({
  component: Balance,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['projects', 'active'],
        queryFn: () => useGetAllProjectsQuery({ active: true }),
      }),
    ])
  },
})
