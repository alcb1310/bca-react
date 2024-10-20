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
  quantity: z.custom<number>((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, 'La cantidad debe ser un numero mayor a 0'),
  cost: z.custom<number>((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, 'El costo debe ser un numero mayor a 0'),
  total: z
    .custom<number>((val) => {
      const num = parseFloat(val)
      return !isNaN(num)
    }, 'El total debe ser un numero')
    .optional(),
})

export type InvoiceDetailsCreateType = z.infer<
  typeof invoiceDetailsCreateSchema
>
