import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type {
	BudgetItem,
	BudgetItemResponse,
	BudgetItemUpdate,
} from '@/types/partidas'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const GetAllPartidas = createServerFn({ method: 'GET' })
	.inputValidator((data: { query?: string; accum?: boolean }) => {
		console.log('data', data)
		return data
	})
	.handler(async ({ data: { query, accum } }) => {
		const token = getCookie(cookieName)

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
	})

export const CreatePartida = createServerFn({ method: 'POST' })
	.inputValidator((data: BudgetItem) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

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
	})

export const UpdatePartida = createServerFn({ method: 'POST' })
	.inputValidator((data: BudgetItemUpdate) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

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
	})
