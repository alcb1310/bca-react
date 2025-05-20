import type { MaterialType } from '~/types/materials'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllMaterialsQuery({
  token,
}: Readonly<{ token: string }>) {
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
  token,
  material,
}: Readonly<{ token: string; material: MaterialType }>) {
  const response = await fetch(`${url}/parametros/materiales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(material),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as MaterialType[]
}

export async function useUpdateMaterialMutation({
  token,
  material,
}: Readonly<{ token: string; material: MaterialType }>) {
  const response = await fetch(`${url}/parametros/materiales/${material.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(material),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as MaterialType[]
}
