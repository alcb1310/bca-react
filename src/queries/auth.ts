const URL = import.meta.env.VITE_BACKEND_SERVER

export type LoginResponse = {
    user: {
        id: number
        email: string
        name: string
        role_id: string
        company_id: string
    }
    token: string
}

export async function LoginMutation({
    email,
    password,
}: { email: string; password: string }) {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error)
    }

    return response.json()
}
