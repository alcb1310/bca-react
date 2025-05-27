import type { InvoiceCreateType, InvoiceResponseType } from '~/types/invoice'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllInvoicesQuery({
  token,
}: Readonly<{ token: string }>) {
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

export async function useGetOneInvoiceQuery({
  token,
  id,
}: Readonly<{ token: string; id: string }>) {
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
  token,
  invoice,
}: Readonly<{ token: string; invoice: InvoiceCreateType }>) {
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
