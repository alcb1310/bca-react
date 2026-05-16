import { store } from '@/redux/store'
import type { UserCreate, UserResponse } from '@/types/user'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function Me() {
    const state = store.getState()

    const response = await fetch(`${URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
    }

    return (await response.json()) as UserResponse
}

export async function GetAllUsers() {
    const state = store.getState()

    const response = await fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
    }

    return (await response.json()) as UserResponse[]
}

export async function CreateUser({ data }: { data: UserCreate }) {
    const state = store.getState()

    const response = await fetch(`${URL}/users`, {
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
