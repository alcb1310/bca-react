import { store } from '@/redux/store'
import type { RubrosType } from '@/types/rubros'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllRubros() {
	const state = store.getState()

	const response = await fetch(`${URL}/parametros/rubros`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${state.login.token}`,
		},
	})

	if (!response.ok) {
		const data = await response.json()

		throw new Error(data.error)
	}

	return (await response.json()) as RubrosType[]
}

export async function GetOneRubro(id: string) {
	const state = store.getState()

	const response = await fetch(`${URL}/parametros/rubros/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${state.login.token}`,
		},
	})

	if (!response.ok) {
		const data = await response.json()

		throw new Error(data.error)
	}

	return (await response.json()) as RubrosType
}

export async function CreateRubro({ data }: { data: RubrosType }) {
	const state = store.getState()

	const response = await fetch(`${URL}/parametros/rubros`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${state.login.token}`,
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
	const state = store.getState()

	const response = await fetch(`${URL}/parametros/rubros/${data.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${state.login.token}`,
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		const data = await response.json()

		throw new Error(data.error)
	}

	return
}
