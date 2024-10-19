import { z } from "zod";
import { supplierSchema } from "./supplier";
import { projectSchema } from "./project";

export const invoiceResponseSchema = z.object({
  id: z.string().uuid(),
  data: z.date(),
  project: projectSchema,
  supplier: supplierSchema,
  invoice_date: z.date(),
  invoice_number: z.string(),
  invoice_total: z.number(),
  company_id: z.string().uuid().optional(),
})

export type InvoiceResponseType = z.infer<typeof invoiceResponseSchema>

export const invoiceCreateSchema = z.object({
  id: z.string().uuid().optional(),
  supplier_id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  invoice_number: z.string().optional(),
  invoice_date: z.date().optional(),
})

export type InvocieCreateType = z.infer<typeof invoiceCreateSchema>
