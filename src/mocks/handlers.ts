// src/mocks/handlers.js
import { rest } from 'msw'
import { login } from './bca/fixtures/login'

// const url = import.meta.env.VITE.BASE_URL as string
export const handlers = [
    // Handles a POST /login request
    rest.post('/api/login', (_req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')

        return res(ctx.status(200), ctx.json(login))
    }),
]
