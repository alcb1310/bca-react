import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type {
	QuantityCreateType,
	QuantityEditType,
	QuantityResponseType,
} from '@/types/cantidades'
import z from 'zod'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const GetAllCantidades = createServerFn({ method: 'GET' }).handler(
	async () => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/analisis/cantidades`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		const data = (await response.json()) as QuantityResponseType[]

		return data
	},
)
export const CreateCantidad = createServerFn({ method: 'POST' })
	.inputValidator((data: QuantityCreateType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/analisis/cantidades`, {
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

export const UpdateCantidad = createServerFn({ method: 'POST' })
	.inputValidator((data: QuantityEditType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/analisis/cantidades/${data.id}`, {
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

export const DeleteCantidad = createServerFn({ method: 'POST' })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/analisis/cantidades/${data.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			const data = await response.json()

			throw new Error(data.error)
		}

		return
	})

export const GetAnalisis = createServerFn({ method: 'GET' })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/analisis/${data.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		const info = (await response.json()) as AnalisisType[]

		return info
	})

const analisysDataSchema = z.object({
	project_name: z.string(),
	category_name: z.string(),
	material_name: z.string(),
	unit: z.string(),
	quantity: z.number(),
})

export type AnalisysDataType = z.infer<typeof analisysDataSchema>

const analisysSchema = z.object({
	key: z.string(),
	data: z.array(analisysDataSchema),
})

export type AnalisisType = z.infer<typeof analisysSchema>
