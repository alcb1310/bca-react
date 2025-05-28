import type { BudgetResponseType } from '~/types/budget'
import type {
  BalanceResponseType,
  SpentDetailsType,
  SpentResponseType,
} from '~/types/reports'

const url = import.meta.env.VITE_BACKEND_SERVER

type LevelType = {
  key: string
  value: string
}

export async function useGetAllLevelsQuery({
  token,
}: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/reportes/levels`, {
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

  return (await response.json()) as LevelType[]
}

export async function useGetAllHistoricQuery({
  token,
  project_id,
  level,
  date,
}: Readonly<{
  token: string
  project_id: string
  level: string
  date: string
}>) {
  const params = new URLSearchParams()
  params.append('project_id', project_id)
  params.append('level', level)
  params.append('date', date)

  const response = await fetch(`${url}/reportes/historico?${params}`, {
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

export async function useGetBalanceReportQuery({
  token,
  project_id,
  date,
}: Readonly<{ token: string; project_id: string; date: string }>) {
  const params = new URLSearchParams()
  params.append('project_id', project_id)
  params.append('date', date)

  const response = await fetch(`${url}/reportes/cuadre?${params}`, {
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

  return (await response.json()) as BalanceResponseType
}

export async function useSetBalancedInvoiceMutation({
  token,
  id,
}: Readonly<{ token: string; id: string }>) {
  const response = await fetch(`${url}/reportes/cuadre/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}

export async function useGetSpentQuery({
  token,
  project_id,
  level,
  date,
}: Readonly<{
  token: string
  project_id: string
  level: string
  date: string
}>) {
  const params = new URLSearchParams()
  params.append('project_id', project_id)
  params.append('level', level)
  params.append('date', date)

  const response = await fetch(`${url}/reportes/gastado?${params}`, {
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

  return (await response.json()) as SpentResponseType
}

export async function useGetSpentDetailsQuery({
  token,
  project_id,
  budget_item_id,
  date,
}: Readonly<{
  token: string
  project_id: string
  budget_item_id: string
  date: string
}>) {
  const response = await fetch(
    `${url}/reportes/gastado/${project_id}/${budget_item_id}/${date}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as SpentDetailsType[]
}
