import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email es obligatorio').email('Email no es valido'),
  password: z
    .string()
    .min(1, 'Contraseña es obligatoria')
    //.min(2, 'Contraseña debe ser mayor a 2 caracteres'),
})

export type LoginInput = z.TypeOf<typeof loginSchema>
