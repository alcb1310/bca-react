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
