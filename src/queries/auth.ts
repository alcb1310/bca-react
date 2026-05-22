import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'

const URL = import.meta.env.VITE_BACKEND_SERVER

export type LoginResponse = {
	user: {
		id: number
		email: string
		name: string
		role_id: string
		company_id: string
	}
	token: string
}

export const LoginMutation = createServerFn({ method: 'POST' })
	.inputValidator((data: { email: string; password: string }) => data)
	.handler(async ({ data: { email, password } }) => {
		const response = await fetch(`${URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		if (!response.ok) {
			const err = await response.json()
			throw new Error(err.error)
		}

		const data = (await response.json()) as LoginResponse
		setCookie('BCA-TOKEN', data.token, { httpOnly: true })
		return data
	})
