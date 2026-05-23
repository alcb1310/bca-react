import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const getInformation = createServerFn().handler(() => {
	const token = getCookie('BCA-TOKEN')
	const URL = import.meta.env.VITE_BACKEND_SERVER

	return {
		token,
		URL,
	}
})
