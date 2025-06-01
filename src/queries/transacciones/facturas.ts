import { loginStore } from '~/store/login'
import type { InvoiceCreateType, InvoiceResponseType } from '~/types/invoice'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllInvoicesQuery() {
  const response = await fetch(`${url}/transacciones/facturas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as InvoiceResponseType[]
}

export async function useGetOneInvoiceQuery({ id }: Readonly<{ id: string }>) {
  const response = await fetch(`${url}/transacciones/facturas/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as InvoiceCreateType
}

export async function useCreateInvoiceMutation({
  invoice,
}: Readonly<{ invoice: InvoiceCreateType }>) {
  const response = await fetch(`${url}/transacciones/facturas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return (await response.json()) as InvoiceCreateType
}

export async function useDeleteInvoiceMutation({
  id,
}: Readonly<{ id: string }>) {
  const response = await fetch(`${url}/transacciones/facturas/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}

export async function useUpdateInvoiceMutation({
  invoice,
}: Readonly<{ invoice: InvoiceCreateType }>) {
  const response = await fetch(`${url}/transacciones/facturas/${invoice.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
