import type { RubrosType } from '~/types/rubros'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllRubrosQuery({
  token,
}: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/parametros/rubros`, {
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

  return (await response.json()) as RubrosType[]
}

export async function useGetOneRubroQuery({
  token,
  id,
}: Readonly<{ token: string; id: string }>) {
  const response = await fetch(`${url}/parametros/rubros/${id}`, {
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

  return (await response.json()) as RubrosType
}
