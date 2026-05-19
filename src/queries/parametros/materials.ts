import { authStore } from '@/store/auth'
import type { MaterialCreateType, MaterialType } from '@/types/materials'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllMaterials() {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/materiales`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return (await response.json()) as MaterialType[]
}

export async function CreateMaterial({ data }: { data: MaterialCreateType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/materiales`, {
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
}

export async function UpdateMaterial({ data }: { data: MaterialType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/materiales/${data.id}`, {
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
