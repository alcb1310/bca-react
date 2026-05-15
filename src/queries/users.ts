import { store } from '@/redux/store'
import type { UserResponse } from '@/types/user'

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
