import type { RubroMaterialResponseTye } from '~/types/rubro-material'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllRubrosMaterialsQuery({
  token,
  rubroId,
}: Readonly<{ token: string; rubroId: string }>) {
  const response = await fetch(
    `${url}/parametros/rubros/${rubroId}/materiales`,
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
  return (await response.json()) as RubroMaterialResponseTye[]
}
