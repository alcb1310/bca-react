import { authStore } from '@/store/auth'
import type { CategoryType } from '@/types/categories'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllCategories() {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/categorias`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	const data = await response.json()

	return data as CategoryType[]
}

export async function CreateCategory({ data }: { data: CategoryType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/categorias`, {
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

export async function UpdateCategory({ data }: { data: CategoryType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/categorias/${data.id}`, {
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
