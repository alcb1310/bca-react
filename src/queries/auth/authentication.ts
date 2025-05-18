import type { LoginInput } from '~/types/login'
import type { UserResponse } from '~/types/user'

const url = import.meta.env.VITE_BACKEND_SERVER
if (!url) throw new Error('VITE_BACKEND_SERVER environment variable not set')

type loginResponse = {
  user: UserResponse
  token: string
}

export async function loginUser(user: LoginInput) {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as loginResponse
}
