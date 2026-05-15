import { store } from '@/redux/store'
import type {
    InvoiceDetailsCreateType,
    InvoiceDetailsResponseType,
} from '@/types/invoiceDetails'

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

export async function CreateInvoiceDetail({
    id,
    data,
}: {
    id: string
    data: InvoiceDetailsCreateType
}) {
    const state = store.getState()

    const response = await fetch(`${URL}/transacciones/facturas/${id}/detalle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
    }

    return
}

export async function DeleteInvoiceDetail({
    invoiceId,
    detailId,
}: { invoiceId: string; detailId: string }) {
    const state = store.getState()
    const response = await fetch(
        `${URL}/transacciones/facturas/${invoiceId}/detalle/${detailId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.login.token}`,
            },
        },
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
    }

    return
}
