import Projects from '@/pages/parametros/projects'
import { useGetAllProjectsQuery } from '@/queries/parametros/proyectos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/proyectos')({
  component: Projects,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['proyectos'],
      queryFn: () => useGetAllProjectsQuery({}),
    })
  },
})
