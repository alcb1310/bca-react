import type { BudgetItemResponse } from '~/types/partidas'

const url = import.meta.env.VITE_BACKEND_SERVER
if (!url) throw new Error('VITE_BACKEND_SERVER environment variable not set')

export async function useGetAllBudgetItemsQuery({
  token,
  query,
  accum,
}: Readonly<{ token: string; query?: string; accum?: boolean }>) {
  const params = new URLSearchParams()
  if (query !== undefined) params.append('query', query)
  if (accum !== undefined) params.append('accum', accum.toString())

  const response = await fetch(`${url}/parametros/partidas?${params}`, {
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

  return (await response.json()) as BudgetItemResponse[]
}
