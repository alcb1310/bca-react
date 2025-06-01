import { loginStore } from '~/store/login'
import type { RubrosType } from '~/types/rubros'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllRubrosQuery() {
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

export async function useGetOneRubroQuery({ id }: Readonly<{ id: string }>) {
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

export async function useCreateRubroMutation({
  item,
}: Readonly<{ item: RubrosType }>) {
  const response = await fetch(`${url}/parametros/rubros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as RubrosType
}

export async function useUpdateRubroMutation({
  item,
}: Readonly<{ item: RubrosType }>) {
  const response = await fetch(`${url}/parametros/rubros/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as RubrosType
}
