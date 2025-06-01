import { loginStore } from '~/store/login'
import type { CierreTypes } from '~/types/cierre'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useCreateClosureMutation({
  cierre,
}: Readonly<{ cierre: CierreTypes }>) {
  const response = await fetch(`${url}/transacciones/cierre`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cierre),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
