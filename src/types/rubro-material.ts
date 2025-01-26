import { z } from 'zod'
import { rubrosSchema } from './rubros'
import { materialSchema } from './materials'

export const rubroMaterialSchema = z.object({
    item_id: z.string().uuid('Seleccione un rubro'),
    material_id: z.string().uuid('Seleccione un material'),
    quantity: z.coerce.number({ message: 'La cantidad deber ser un  número' }),
})

export type RubroMaterialType = z.infer<typeof rubroMaterialSchema>

export const rubroMaterialResponseSchema = z.object({
    item: rubrosSchema,
    material: materialSchema,
    quantity: z.custom<number>((val) => {
        const num = parseFloat(val)
        return !isNaN(num)
    }, 'La cantidad deber ser un  número'),
})

export type RubroMaterialResponseTye = z.infer<
    typeof rubroMaterialResponseSchema
>
