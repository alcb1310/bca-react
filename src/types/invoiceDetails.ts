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
