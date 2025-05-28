import type { BudgetResponseType } from '~/types/budget'

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
