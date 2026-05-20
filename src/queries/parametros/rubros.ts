import { authStore } from '@/store/auth'
import type { RubrosType } from '@/types/rubros'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllRubros() {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/rubros`, {
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

	return (await response.json()) as RubrosType[]
}

export async function GetOneRubro(id: string) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/rubros/${id}`, {
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

	return (await response.json()) as RubrosType
}

export async function CreateRubro({ data }: { data: RubrosType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/rubros`, {
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

	return (await response.json()) as RubrosType
}

export async function UpdateRubro({ data }: { data: RubrosType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/rubros/${data.id}`, {
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
}
