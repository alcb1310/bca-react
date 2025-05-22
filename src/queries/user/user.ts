import type { UserCreate, UserResponse } from '~/types/user'

const url = import.meta.env.VITE_BACKEND_SERVER

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
    throw new Error(err.error)
  }

  return (await response.json()) as UserResponse
}

export async function useGetAllUsersQuery({
  token,
}: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/users`, {
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

  return (await response.json()) as UserResponse[]
}

export async function useCreateUserMutation({
  token,
  user,
}: Readonly<{ token: string; user: UserCreate }>) {
  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
