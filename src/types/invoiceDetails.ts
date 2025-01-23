import { z } from 'zod'

export const invoiceDetailsResponseSchema = z.object({
    id: z.string().uuid(),
    budget_item_id: z.string().uuid(),
    budget_item_code: z.string(),
    budget_item_name: z.string(),
    quantity: z.number(),
    cost: z.number(),
    total: z.number(),
    invoice_total: z.number(),
    company_id: z.string().uuid(),
})

export type InvoiceDetailsResponseType = z.infer<
    typeof invoiceDetailsResponseSchema
>

export const invoiceDetailsCreateSchema = z.object({
    budget_item_id: z.string().uuid('Seleccione una partida'),
    quantity: z.coerce.number({ message: 'La cantidad debe ser un número' }),
    cost: z.coerce.number({ message: 'El costo debe ser un número' }),
    total: z.coerce.number({ message: 'El total debe ser un número' }).optional(),
})

export type InvoiceDetailsCreateType = z.infer<
    typeof invoiceDetailsCreateSchema
>
