import { z } from 'zod'
import { supplierSchema } from './supplier'
import { projectSchema } from './project'

export const invoiceResponseSchema = z.object({
  id: z.string().uuid(),
  data: z.date(),
  project: projectSchema,
  supplier: supplierSchema,
  invoice_date: z.date(),
  invoice_number: z.string(),
  invoice_total: z.number(),
  company_id: z.string().uuid().optional(),
  is_balanced: z.boolean().optional(),
})

export type InvoiceResponseType = z.infer<typeof invoiceResponseSchema>

export const invoiceCreateSchema = z.object({
  id: z.string().uuid().optional(),
  supplier_id: z.string().uuid('Seleccione un proveedor'),
  project_id: z.string().uuid('Seleccione un proyecto'),
  invoice_number: z.string().min(1, 'Ingrese el numero de la Factura'),
  invoice_date: z.coerce.date({
    message: 'Ingrese una fecha',
  }),
  invoice_total: z.custom<number>((val) => {
    const num = parseFloat(val)
    return !isNaN(num)
  }, 'El total deber ser un  número'),
})

export type InvoiceCreateType = z.infer<typeof invoiceCreateSchema>
