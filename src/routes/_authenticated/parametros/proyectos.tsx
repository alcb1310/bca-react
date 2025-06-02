import { createFileRoute } from '@tanstack/react-router'
import Projects from '~/pages/parametros/projects'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'

export const Route = createFileRoute('/_authenticated/parametros/proyectos')({
  component: Projects,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['projects'],
      queryFn: () => useGetAllProjectsQuery({}),
    })
  },
})
