import { LoginResponse } from '@/queries/auth'
import { Store } from '@tanstack/react-store'
export const authStore = new Store<{
    user: LoginResponse['user'] | null
    token: string
}>({
    user: null,
    token: ''
})

