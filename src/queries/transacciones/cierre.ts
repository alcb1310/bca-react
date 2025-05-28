import type { CierreTypes } from '~/types/cierre'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useCreateClosureMutation({
  token,
  cierre,
}: Readonly<{ token: string; cierre: CierreTypes }>) {
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
