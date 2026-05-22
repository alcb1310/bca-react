import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { ProjectType } from '@/types/project'

const URL = import.meta.env.VITE_BACKEND_SERVER
const cookieName = 'BCA-TOKEN'

export const GetAllProjects = createServerFn({ method: 'GET' })
	.inputValidator((data: { query?: string; active?: boolean }) => data)
	.handler(async ({ data: { query, active } }) => {
		const token = getCookie(cookieName)

		const params = new URLSearchParams()
		if (query) params.append('query', query)
		if (active) params.append('active', active.toString())

		const response = await fetch(`${URL}/parametros/proyectos?${params}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.json() as Promise<ProjectType[]>
	})

export const GetOneProject = createServerFn({ method: 'GET' })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data: { id } }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/parametros/proyectos/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}

		return response.json() as Promise<ProjectType>
	})

export const CreateProject = createServerFn({ method: 'POST' })
	.inputValidator((data: ProjectType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/parametros/proyectos`, {
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

export const UpdateProject = createServerFn({ method: 'POST' })
	.inputValidator((data: ProjectType) => data)
	.handler(async ({ data }) => {
		const token = getCookie(cookieName)

		const response = await fetch(`${URL}/parametros/proyectos/${data.id}`, {
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
