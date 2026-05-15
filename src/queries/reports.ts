import { store } from '@/redux/store'
import type { LevelType } from '@/types/reports'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllLevels() {
    const state = store.getState()

    const response = await fetch(`${URL}/reportes/levels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })
    const data = await response.json()
    return data as LevelType[]
}
