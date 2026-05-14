import { store } from '@/redux/store'
import type { BudgetEditType, BudgetResponseType } from '@/types/budget'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllBudgets({
    query,
    project,
}: { query?: string; project?: string }) {
    const state = store.getState()

    const params = new URLSearchParams()
    if (query) params.append('query', query)
    if (project) params.append('project', project)

    const response = await fetch(`${URL}/transacciones/presupuestos?${params}`, {
        headers: {
            Authorization: `Bearer ${state.login.token}`,
        },
    })
    return response.json() as Promise<BudgetResponseType[]>
}

export async function CreateBudget({ data }: { data: BudgetEditType }) {
    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/presupuestos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
    }

    return
}
