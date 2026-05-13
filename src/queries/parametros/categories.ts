import { store } from '@/redux/store'
import type { CategoryType } from '@/types/categories'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllCategories() {
    const state = store.getState()

    const response = await fetch(`${URL}/parametros/categorias`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log(data)

    return data as CategoryType[]
}
