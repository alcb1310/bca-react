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
