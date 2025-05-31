import { loginStore } from '~/store/login'
import type { MaterialType } from '~/types/materials'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllMaterialsQuery() {
  const response = await fetch(`${url}/parametros/materiales`, {
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

  return (await response.json()) as MaterialType[]
}

export async function useCreateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  const body = {
    ...material,
    category_id: material.category.id,
  }
  const response = await fetch(`${url}/parametros/materiales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as MaterialType
}

export async function useUpdateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  const body = {
    ...material,
    category_id: material.category.id,
  }
  const response = await fetch(`${url}/parametros/materiales/${material.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
