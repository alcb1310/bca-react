import { loginStore } from '~/store/login'
import type {
  RubroMaterialResponseTye,
  RubroMaterialType,
} from '~/types/rubro-material'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllRubrosMaterialsQuery({
  rubroId,
}: Readonly<{ rubroId: string }>) {
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

export async function useCreateRubrosMaterialMutation({
  rubro,
}: Readonly<{ rubro: RubroMaterialType }>) {
  const response = await fetch(
    `${url}/parametros/rubros/${rubro.item_id}/materiales`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rubro),
    },
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }
  return
}

export async function useUpdateRubrosMaterialMutation({
  rubro,
}: Readonly<{ rubro: RubroMaterialType }>) {
  const response = await fetch(
    `${url}/parametros/rubros/${rubro.item_id}/materiales/${rubro.material_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rubro),
    },
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }
  return
}

export async function useDeleteRubrosMaterialMutation({
  rubroId,
  materialId,
}: Readonly<{ rubroId: string; materialId: string }>) {
  const response = await fetch(
    `${url}/parametros/rubros/${rubroId}/materiales/${materialId}`,
    {
      method: 'DELETE',
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
  return
}
