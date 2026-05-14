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
