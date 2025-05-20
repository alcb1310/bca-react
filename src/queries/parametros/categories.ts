import type { CategoryType } from '~/types/categories'

const url = import.meta.env.VITE_BACKEND_SERVER

export async function useGetAllCategoriesQuery({
  token,
}: Readonly<{ token: string }>) {
  const response = await fetch(`${url}/parametros/categorias`, {
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

  return (await response.json()) as CategoryType[]
}

export async function useCreateCategoryMutation({
  token,
  category,
}: Readonly<{ token: string; category: CategoryType }>) {
  const response = await fetch(`${url}/parametros/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error)
  }

  return
}
