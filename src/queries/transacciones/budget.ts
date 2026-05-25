import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { BudgetEditType, BudgetResponseType } from '@/types/budget'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const GetAllBudgets = createServerFn({ method: 'GET' })
	.inputValidator((data: { query?: string; project?: string }) => data)
	.handler(async ({ data: { query, project } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		if (query) params.append('query', query)
		if (project) params.append('project', project)

		const response = await fetch(
			`${URL}/transacciones/presupuestos?${params}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		return response.json() as Promise<BudgetResponseType[]>
	})

export const CreateBudget = createServerFn({ method: 'POST' })
	.inputValidator((data: BudgetEditType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/transacciones/presupuestos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const error = await response.json()
			throw new Error(error.error)
		}

		return
	})

export const UpdateBudget = createServerFn({ method: 'POST' })
	.inputValidator((data: BudgetEditType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(
			`${URL}/transacciones/presupuestos/${data.project_id}/${data.budget_item_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			},
		)

		if (!response.ok) {
			const error = await response.json()
			throw new Error(error.error)
		}

		return
	})

export const GetAllBugetsByProjectAndLevel = createServerFn({ method: 'GET' })
	.inputValidator((data: { project_id: string; level: string }) => data)
	.handler(async ({ data: { project_id, level } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		params.append('project_id', project_id)
		params.append('level', level)

		const response = await fetch(`${URL}/reportes/actual?${params}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.json() as Promise<BudgetResponseType[]>
	})
