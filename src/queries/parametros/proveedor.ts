import { loginStore } from '~/store/login'
import type { SupplierType } from '~/types/supplier'

const url = import.meta.env.VITE_BACKEND_SERVER
const token = loginStore.state.token

export async function useGetAllSuppliersQuery({
  search,
}: Readonly<{ search?: string }>) {
  const params = new URLSearchParams()
  if (search) params.append('search', search)

  const response = await fetch(`${url}/parametros/proveedores?${params}`, {
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

  return (await response.json()) as SupplierType[]
}

export async function useCreateSupplierMutation({
  supplier,
}: Readonly<{ supplier: SupplierType }>) {
  const response = await fetch(`${url}/parametros/proveedores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(supplier),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}

export async function useUpdateSupplierMutation({
  supplier,
}: Readonly<{ supplier: SupplierType }>) {
  const response = await fetch(`${url}/parametros/proveedores/${supplier.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(supplier),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
