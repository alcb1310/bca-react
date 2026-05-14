import { store } from '@/redux/store'
import type { BudgetItemResponse } from '@/types/partidas'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllBudgetItems({
    query,
    accum,
}: { query?: string; accum?: boolean }) {
    const state = store.getState()

    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (accum) params.set('accum', accum.toString())

    const response = await fetch(`${URL}/parametros/partidas?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) throw new Error('Network response was not ok')

    return response.json() as Promise<BudgetItemResponse[]>
}
