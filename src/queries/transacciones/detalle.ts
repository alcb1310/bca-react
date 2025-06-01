import { loginStore } from '~/store/login'
import type {
  InvoiceDetailsCreateType,
  InvoiceDetailsResponseType,
} from '~/types/invoiceDetails'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllInvoiceDetailsQuery({
  id,
}: Readonly<{ id: string }>) {
  const response = await fetch(`${url}/transacciones/facturas/${id}/detalle`, {
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

  return (await response.json()) as InvoiceDetailsResponseType[]
}

export async function useCreateIvoiceDetailsMutation({
  detail,
  id,
}: Readonly<{ id: string; detail: InvoiceDetailsCreateType }>) {
  const response = await fetch(`${url}/transacciones/facturas/${id}/detalle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(detail),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}

export async function useDeleteInvoiceDetailsMutation({
  invoiceId,
  detailId,
}: Readonly<{ invoiceId: string; detailId: string }>) {
  const response = await fetch(
    `${url}/transacciones/facturas/${invoiceId}/detalle/${detailId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
