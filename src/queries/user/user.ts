import type { UserCreate, UserResponse } from '~/types/user'

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

export async function useAllUsersQuery({ token }: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/users`, {
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

  return (await response.json()) as UserResponse[]
}

export async function useDeleteUserMutation({
  token,
  id,
}: Readonly<{ token: string; id: string }>) {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error())
  }

  return
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
    throw new Error(err.error())
  }

  return (await response.json()) as UserResponse
}

export async function useUpdateUserMutation({
  token,
  user,
}: Readonly<{ token: string; user: UserResponse }>) {
  const response = await fetch(`${url}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error())
  }

  return (await response.json()) as UserResponse
}

export async function useUpdatePasswordMutation({
  token,
  password,
}: Readonly<{ token: string; password: string }>) {
  const pass = { password }
  const response = await fetch(`${url}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pass),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error())
  }

  return
}
