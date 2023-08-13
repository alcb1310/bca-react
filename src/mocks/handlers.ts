// src/mocks/handlers.js
import { rest } from 'msw'
import { login } from './bca/fixtures/login'
import { validate } from './bca/fixtures/validate'

// const url = import.meta.env.VITE.BASE_URL as string
export const handlers = [
    // Handles a POST /login request
    rest.post('/api/login', (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(login))
    }),

    rest.get("/api/validate", (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(validate))
    })
]
