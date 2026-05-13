import { store } from '@/redux/store'
import type { MaterialType } from '@/types/materials'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllMaterials() {
    const state = store.getState()

    const response = await fetch(`${URL}/parametros/materiales`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return (await response.json()) as MaterialType
}
