import { store } from '@/redux/store'
import type { InvoiceDetailsResponseType } from '@/types/invoiceDetails'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllInvoiceDetails(id: string) {
    const state = store.getState()

    const response = await fetch(`${URL}/transacciones/facturas/${id}/detalle`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json() as Promise<InvoiceDetailsResponseType[]>
}
