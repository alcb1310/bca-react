import { z } from 'zod'

export const materialSchema = z.object({
    id: z.string().uuid().optional(),
    code: z.string().min(1, 'Código es obligatorio'),
    name: z.string().min(1, 'Nombre es obligatorio'),
    unit: z.string().min(1, 'Unidad es obligatorio'),
    category: z.object({
        id: z.string().uuid('Seleccione una categoría'),
        name: z.string().optional(),
    }),
})

export type MaterialType = z.infer<typeof materialSchema>

export const materialCreateSchema = z.object({
    code: z.string().min(1, 'Código es obligatorio'),
    name: z.string().min(1, 'Nombre es obligatorio'),
    unit: z.string().min(1, 'Unidad es obligatorio'),
    category_id: z.string().uuid('Seleccione una categoría'),
})

export type MaterialCreateType = z.infer<typeof materialCreateSchema>
