import { authStore } from '@/store/auth'
import type { BudgetItem, BudgetItemResponse } from '@/types/partidas'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllPartidas({
	query,
	accum,
}: {
	query?: string
	accum?: boolean
}) {
	const token = authStore.state.token

	const params = new URLSearchParams()
	if (query) params.set('query', query)
	if (accum !== undefined) {
		params.set('accum', accum.toString())
	}

	const response = await fetch(`${URL}/parametros/partidas?${params}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) throw new Error('Network response was not ok')

	return response.json() as Promise<BudgetItemResponse[]>
}

export async function CreatePartida({ data }: { data: BudgetItem }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/partidas`, {
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

export async function UpdatePartida({ data }: { data: BudgetItem }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/parametros/partidas/${data.id}`, {
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
