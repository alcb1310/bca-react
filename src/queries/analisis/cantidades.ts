import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type {
	QuantityCreateType,
	QuantityEditType,
	QuantityResponseType,
} from '@/types/cantidades'

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
