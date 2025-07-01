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
