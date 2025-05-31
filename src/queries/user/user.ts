import { loginStore } from '~/store/login'
import type { PasswordType, UserCreate, UserResponse } from '~/types/user'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useMeQuery() {
  console.log(token)
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

export async function useGetAllUsersQuery() {
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
  user,
}: Readonly<{ user: UserCreate }>) {
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

export async function useDeleteUserMutation({ id }: Readonly<{ id: string }>) {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}

export async function useUpdateUserMutation({
  user,
}: Readonly<{ user: UserResponse }>) {
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
    throw new Error(err.error)
  }

  return
}

export async function useUpdatePasswordMutation({
  password,
}: Readonly<{ password: PasswordType }>) {
  const response = await fetch(`${url}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(password),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
