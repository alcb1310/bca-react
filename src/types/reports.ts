import { InvoiceResponseType } from './invoice'
import { BudgetItem } from './partidas'

export type BalanceResponseType = {
  invoices: InvoiceResponseType[]
  total: number
}

export type Spent = {
  spent: number
  budget_item: BudgetItem
}

export type SpentResponseType = {
  spent: Spent[]
  total: number
  project: string
}

export type SpentDetailsType = {
  budget_item_code: string
  budget_item_id: string
  budget_item_name: string
  budget_item_level: number
  company_id: string
  cost: number
  invoice_date: string
  invoice_id: string
  invoice_number: string
  invoice_total: number
  project_id: string
  project_name: string
  quantity: number
  supplier_id: string
  supplier_name: string
  supplier_number: string
  total: number
}
