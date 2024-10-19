import { z } from "zod";
import { supplierSchema } from "./supplier";
import { projectSchema } from "./project";

export const invoiceResponse = z.object({
  id: z.string().uuid(),
  data: z.date(),
  project: projectSchema,
  supplier: supplierSchema,
  invoice_date: z.date(),
  invoice_number: z.string(),
  invoice_total: z.number(),
  company_id: z.string().uuid().optional(),
})

export type InvoiceResponseType = z.infer<typeof invoiceResponse>
