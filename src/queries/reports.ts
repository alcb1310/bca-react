import { store } from '@/redux/store'
import type { BudgetResponseType } from '@/types/budget'
import type {
    BalanceResponseType,
    LevelType,
    SpentResponseType,
} from '@/types/reports'

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

export async function GetAllHistoric({
    project_id,
    level,
    date,
}: {
    project_id: string
    level: string
    date: string
}) {
    const state = store.getState()

    const params = new URLSearchParams()
    params.append('project_id', project_id)
    params.append('level', level)
    params.append('date', date)

    const response = await fetch(`${URL}/reportes/historico?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network error')
    }

    if (response.status === 204) return [] as BudgetResponseType[]

    return response.json() as Promise<BudgetResponseType[]>
}

export async function GetBalanceReport({
    project_id,
    date,
}: { project_id: string; date: string }) {
    const state = store.getState()

    const params = new URLSearchParams()
    params.append('project_id', project_id)
    params.append('date', date)

    const response = await fetch(`${URL}/reportes/cuadre?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network error')
    }

    return response.json() as Promise<BalanceResponseType>
}

export async function SetBalancedInvoice({
    invoice_id,
}: { invoice_id: string }) {
    const state = store.getState()

    const response = await fetch(`${URL}/reportes/cuadre/${invoice_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error)
    }

    return
}

export async function GetSpentReport({
    project_id,
    level,
    date,
}: {
    project_id: string
    level: string
    date: string
}) {
    const state = store.getState()

    const params = new URLSearchParams()
    params.append('project_id', project_id)
    params.append('level', level)
    params.append('date', date)

    const response = await fetch(`${URL}/reportes/gastado?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    return response.json() as Promise<SpentResponseType>
}
