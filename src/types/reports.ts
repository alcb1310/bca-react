import { InvoiceResponseType } from './invoice'

export type BalanceResponseType = {
  invoices: InvoiceResponseType[]
  total: number
}
