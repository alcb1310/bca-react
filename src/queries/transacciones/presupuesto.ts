import { loginStore } from '~/store/login'
import type { BudgetEditType, BudgetResponseType } from '~/types/budget'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllBudgetsQuery({
  query,
  project,
}: Readonly<{ query?: string; project?: string }>) {
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
  project_id,
  level,
}: Readonly<{ project_id: string; level: string }>) {
  const params = new URLSearchParams()
  if (project_id) params.append('project_id', project_id)
  if (level) params.append('level', level)

  const response = await fetch(`${url}/reportes/actual?${params}`, {
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

export async function useCreateBudgetMutation({
  budget,
}: Readonly<{ budget: BudgetEditType }>) {
  const response = await fetch(`${url}/transacciones/presupuestos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budget),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as BudgetResponseType
}

export async function useUpdateBudgetMutation({
  budget,
}: Readonly<{ budget: BudgetEditType }>) {
  const response = await fetch(
    `${url}/transacciones/presupuestos/${budget.project_id}/${budget.budget_item_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(budget),
    },
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
