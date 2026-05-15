import { store } from '@/redux/store'
import type { InvoiceCreateType, InvoiceResponseType } from '@/types/invoice'

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

export async function CreateInvoice({ data }: { data: InvoiceCreateType }) {
    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/facturas`, {
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

    return response.json() as Promise<InvoiceResponseType>
}

export async function GetOneInvoice(id: string) {
    if (id === 'crear') {
        return {
            project_id: '',
            supplier_id: '',
            invoice_number: '',
            invoice_date: '',
            invoice_total: 0,
        }
    }

    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/facturas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json() as Promise<InvoiceCreateType>
}

export async function UpdateInvoice({ data }: { data: InvoiceCreateType }) {
    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/facturas/${data.id}`, {
        method: 'PUT',
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

export async function DeleteInvoice({ id }: { id: string }) {
    const state = store.getState()
    const response = await fetch(`${URL}/transacciones/facturas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.login.token}`,
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
    }

    return
}
