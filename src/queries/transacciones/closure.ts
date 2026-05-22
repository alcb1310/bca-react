import { authStore } from '@/store/auth'
import type { CierreTypes } from '@/types/cierre'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function CreateClosure({ data }: { data: CierreTypes }) {
	const token = authStore.state.token

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
}
