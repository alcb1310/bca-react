import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { CierreTypes } from '@/types/cierre'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const CreateClosure = createServerFn({ method: 'POST' })
	.inputValidator((data: CierreTypes) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/transacciones/cierre`, {
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
