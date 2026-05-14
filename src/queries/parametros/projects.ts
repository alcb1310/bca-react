import { store } from '@/redux/store'
import type { ProjectType } from '@/types/project'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllProjects({
    query,
    active,
}: { query?: string; active?: boolean }) {
    const state = store.getState()

    const params = new URLSearchParams()
    if (query) params.append('query', query)
    if (active) params.append('active', active.toString())

    const response = await fetch(`${URL}/parametros/proyectos?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })
    return response.json() as Promise<ProjectType[]>
}

export async function CreateProject({ data }: { data: ProjectType }) {
    const state = store.getState()

    const response = await fetch(`${URL}/parametros/proyectos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
    }

    return
}

export async function UpdateProject({ data }: { data: ProjectType }) {
    const state = store.getState()

    const response = await fetch(`${URL}/parametros/proyectos/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
    }

    return
}
