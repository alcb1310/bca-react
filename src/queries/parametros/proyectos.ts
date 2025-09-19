import type { ProjectType } from '@/types/project'
import { fetcher } from '@/utils/fetch'

export function useCreateProjectMutation({
  project,
}: Readonly<{ project: ProjectType }>) {
  return fetcher<ProjectType>('/parametros/proyectos', {
    method: 'POST',
    body: JSON.stringify(project),
  })
}

export function useUpdateProjectMutation({
  project,
}: Readonly<{ project: ProjectType }>) {
  return fetcher(`/parametros/proyectos/${project.id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  })
}

export function useGetAllProjectsQuery({
  query,
  active,
}: Readonly<{ query?: string; active?: boolean }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (active !== undefined) params.append('active', String(active))

  return fetcher<ProjectType[]>(`/parametros/proyectos?${params}`, {
    method: 'GET',
  })
}
