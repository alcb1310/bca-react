import { z } from 'zod'

export const userResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Nombre es obligatorio'),
    email: z.string(),
    company_id: z.string().uuid(),
    role_id: z.string(),
})

export type UserResponse = z.infer<typeof userResponseSchema>

export const userCreateSchema = z.object({
    name: z.string().min(1, 'Nombre es obligatorio'),
    email: z.string().min(1, 'Email es obligatorio').email('Email no es valido'),
    password: z
        .string()
        .min(1, 'Contraseña es obligatoria')
        .min(8, 'Contraseña debe ser mayor a 8 caracteres'),
})

export type UserCreate = z.infer<typeof userCreateSchema>

export const passwordSchema = z.object({
    password: z
        .string()
        .min(1, 'Contraseña es obligatoria')
        .min(8, 'Contraseña debe ser mayor a 8 caracteres'),
})

export type PasswordType = z.infer<typeof passwordSchema>
