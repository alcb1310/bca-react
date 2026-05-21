import { authStore } from '@/store/auth'
import type {
	InvoiceDetailsCreateType,
	InvoiceDetailsResponseType,
} from '@/types/invoiceDetails'

const URL = import.meta.env.VITE_BACKEND_SERVER

export async function GetAllInvoiceDetails(id: string) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/transacciones/facturas/${id}/detalle`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return (await response.json()) as InvoiceDetailsResponseType[]
}

export async function CreateInvoiceDetail({
	id,
	data,
}: {
	id: string
	data: InvoiceDetailsCreateType
}) {
	const token = authStore.state.token

	const response = await fetch(`${URL}/transacciones/facturas/${id}/detalle`, {
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

	return
}

export async function DeleteInvoiceDetail({
	invoiceId,
	detailId,
}: {
	invoiceId: string
	detailId: string
}) {
	const token = authStore.state.token
	const response = await fetch(
		`${URL}/transacciones/facturas/${invoiceId}/detalle/${detailId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	)

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.error)
	}

	return
}
