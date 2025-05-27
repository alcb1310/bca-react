import type { InvoiceDetailsResponseType } from '~/types/invoiceDetails'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllInvoiceDetailsQuery({
  token,
  id,
}: Readonly<{ token: string; id: string }>) {
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
