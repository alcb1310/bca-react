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
    total: number[]
    project: string
}
