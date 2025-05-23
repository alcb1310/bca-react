import type { ProjectType } from '~/types/project'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllProjectsQuery({
  token,
  query,
  active,
}: Readonly<{ token: string; query?: string; active?: boolean }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (active !== undefined) params.append('active', active ? 'true' : 'false')

  const response = await fetch(`${url}/parametros/proyectos?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as ProjectType[]
}

export async function useCreateProjectMutation({
  token,
  project,
}: Readonly<{ token: string; project: ProjectType }>) {
  const response = await fetch(`${url}/parametros/proyectos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as ProjectType
}
