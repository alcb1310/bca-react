import { authStore } from '@/store/auth'
import type { InvoiceCreateType, InvoiceResponseType } from '@/types/invoice'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllInvoices() {
	const token = authStore.state.token

	const response = await fetch(`${URL}/transacciones/facturas`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return response.json() as Promise<InvoiceResponseType[]>
}

export async function CreateInvoice({ data }: { data: InvoiceCreateType }) {
	const token = authStore.state.token
	const response = await fetch(`${URL}/transacciones/facturas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
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
			id: '',
			project_id: '',
			supplier_id: '',
			invoice_number: '',
			invoice_date: new Date(),
			invoice_total: 0,
		} as InvoiceCreateType
	}

	const token = authStore.state.token
	const response = await fetch(`${URL}/transacciones/facturas/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return (await response.json()) as InvoiceCreateType
}

export async function UpdateInvoice({ data }: { data: InvoiceCreateType }) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/transacciones/facturas/${data.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
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
	const token = authStore.state.token
	const response = await fetch(`${URL}/transacciones/facturas/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.error)
	}

	return
}
