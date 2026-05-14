import { store } from '@/redux/store'
import type { InvoiceResponseType } from '@/types/invoice'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllInvoices() {
    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/facturas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json() as Promise<InvoiceResponseType[]>
}
