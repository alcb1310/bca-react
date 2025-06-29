import type { BudgetItem } from '@/types/partidas'
import { fetcher } from '@/utils/fetch'

export async function useCreateBudgetItemMutation({
  bugetItem,
}: Readonly<{ bugetItem: BudgetItem }>) {
  return fetcher<BudgetItem>('/parametros/partidas', {
    method: 'POST',
    body: JSON.stringify(bugetItem),
  })
}

export async function useUpdateBugetItemMutation({
  budgetItem,
}: Readonly<{ budgetItem: BudgetItem }>) {
  return fetcher(`/parametros/partidas/${budgetItem.id}`, {
    method: 'PUT',
    body: JSON.stringify(budgetItem),
  })
}

export async function useGetAllBudgetItemsQuery({
  query,
  accum,
}: Readonly<{ query?: string; accum?: boolean }>) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (accum !== undefined) params.append('accum', String(accum))

  return fetcher<BudgetItem[]>(`/parametros/partidas?${params}`, {
    method: 'GET',
  })
}
