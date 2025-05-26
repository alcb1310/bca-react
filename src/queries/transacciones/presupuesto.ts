import type { BudgetResponseType } from '~/types/budget'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllBudgetsQuery({
  token,
  query,
  project,
}: Readonly<{ token: string; query?: string; project?: string }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (project) params.append('project', project)

  const response = await fetch(`${url}/transacciones/presupuestos?${params}`, {
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

  return (await response.json()) as BudgetResponseType[]
}

export async function useGetAllBudgetsByProjectAndLevelQuery({
  token,
  project_id,
  level,
}: Readonly<{ token: string; project_id: string; level: string }>) {
  const params = new URLSearchParams()
  if (project_id) params.append('project_id', project_id)
  if (level) params.append('level', level)

  const response = await fetch(`${url}/transacciones/presupuestos?${params}`, {
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

  return (await response.json()) as BudgetResponseType[]
}
