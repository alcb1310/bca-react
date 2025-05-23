import type { BudgetItemResponse } from '~/types/partidas'

const url = import.meta.env.VITE_SERVER_URL

export async function useGetAllBudgetItemsQuery({
  token,
  query,
  accum,
}: Readonly<{ token: string; query?: string; accum?: boolean }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (accum !== undefined) params.append('accum', accum ? 'true' : 'false')

  const response = await fetch(`${url}/parametros/partidas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: params,
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as BudgetItemResponse[]
}
