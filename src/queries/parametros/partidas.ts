import type { BudgetItem, BudgetItemResponse } from '~/types/partidas'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllBudgetItemsQuery({
  token,
  query,
  accum,
}: Readonly<{ token: string; query?: string; accum?: boolean }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (accum !== undefined) params.append('accum', accum ? 'true' : 'false')

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

export async function useCreateBudgetItemMutation({
  token,
  budgetItem,
}: Readonly<{ token: string; budgetItem: BudgetItem }>) {
  const response = await fetch(`${url}/parametros/partidas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budgetItem),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as BudgetItem
}

export async function useUpdateBudgetItemMutation({
  token,
  budgetItem,
}: Readonly<{ token: string; budgetItem: BudgetItem }>) {
  const response = await fetch(`${url}/parametros/partidas/${budgetItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budgetItem),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
