import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { UserCreate, UserResponse } from '@/types/user'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const Me = createServerFn({ method: 'GET' }).handler(async () => {
	const token = getCookie(cookieName)

	const response = await fetch(`${URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		const data = await response.json()
		throw new Error(data.error)
	}

	return (await response.json()) as UserResponse
})

export const GetAllUsers = createServerFn({ method: 'GET' }).handler(
	async () => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}

		return (await response.json()) as UserResponse[]
	},
)

export const CreateUser = createServerFn({ method: 'POST' })
	.inputValidator((data: UserCreate) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}

		return
	})

export const DeleteUser = createServerFn({ method: 'POST' })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data: { id } }) => {
		const token = getCookie(cookieName)
		console.log('DeleteUser', token)

		const response = await fetch(`${URL}/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			if (response.status === 403) {
				throw new Error('No tienes permiso para realizar esta acción')
			}

			const data = await response.json()
			throw new Error(data.error)
		}

		return
	})

export const UpdateUser = createServerFn({ method: 'POST' })
	.inputValidator((data: UserResponse) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/users/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}

		return
	})

export const UpdatePassword = createServerFn({ method: 'POST' })
	.inputValidator((data: { password: string }) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/users`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}

		return
	})
