import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { BudgetResponseType } from '@/types/budget'
import type {
	BalanceResponseType,
	LevelType,
	SpentDetailsType,
	SpentResponseType,
} from '@/types/reports'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const GetAllLevels = createServerFn({ method: 'GET' }).handler(
	async () => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/reportes/levels`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data as LevelType[]
	},
)

export const GetAllHistoric = createServerFn({ method: 'GET' })
	.inputValidator(
		(data: { project_id: string; level: string; date: string }) => data,
	)
	.handler(async ({ data: { project_id, level, date } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		params.append('project_id', project_id)
		params.append('level', level)
		params.append('date', new Date(date).toISOString())

		const response = await fetch(`${URL}/reportes/historico?${params}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Network error')
		}

		if (response.status === 204) return [] as BudgetResponseType[]

		return response.json() as Promise<BudgetResponseType[]>
	})

export const GetBalanceReport = createServerFn({ method: 'GET' })
	.inputValidator((data: { project_id: string; date: string }) => data)
	.handler(async ({ data: { project_id, date } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		params.append('project_id', project_id)
		params.append('date', date)

		const response = await fetch(`${URL}/reportes/cuadre?${params}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Network error')
		}

		return response.json() as Promise<BalanceResponseType>
	})

export const SetBalancedInvoice = createServerFn({ method: 'POST' })
	.inputValidator((data: { invoice_id: string }) => data)
	.handler(async ({ data: { invoice_id } }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/reportes/cuadre/${invoice_id}`, {
			method: 'PUT',
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
	})

export const GetSpentReport = createServerFn({ method: 'GET' })
	.inputValidator(
		(data: { project_id: string; level: string; date: string }) => data,
	)
	.handler(async ({ data: { project_id, level, date } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		params.append('project_id', project_id)
		params.append('level', level)
		params.append('date', date)

		const response = await fetch(`${URL}/reportes/gastado?${params}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		return response.json() as Promise<SpentResponseType>
	})

export const GetSpentDetails = createServerFn({ method: 'GET' })
	.inputValidator(
		(data: { project_id: string; budget_item_id: string; date: string }) =>
			data,
	)
	.handler(async ({ data: { project_id, budget_item_id, date } }) => {
		const token = getCookie(cookieName)

		const response = await fetch(
			`${URL}/reportes/gastado/${project_id}/${budget_item_id}/${date}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		)

		return response.json() as Promise<SpentDetailsType[]>
	})
