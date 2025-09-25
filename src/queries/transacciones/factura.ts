import type { InvoiceResponseType } from '@/types/invoice'
import { fetcher } from '@/utils/fetch'

export function useGetAllInvoicesQuery(): Promise<
    InvoiceResponseType[] | undefined
> {
    return fetcher<InvoiceResponseType[]>('/transacciones/facturas', {
        method: 'GET',
    })
}
