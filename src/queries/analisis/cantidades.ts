import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { QuantityResponseType } from '@/types/cantidades'

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
