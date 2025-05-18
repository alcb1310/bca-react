import type { UserResponse } from '~/types/user'

const url = import.meta.env.VITE_BACKEND_SERVER
if (!url) throw new Error('VITE_BACKEND_SERVER environment variable not set')

export async function useMeQuery({ token }: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error())
  }

  return (await response.json()) as UserResponse
}
