import type { CategoryType } from '@/types/categories'
import { fetcher } from '@/utils/fetch'

export function useCreateCategoryMutation({
  category,
}: Readonly<{ category: CategoryType }>) {
  return fetcher<CategoryType>('/parametros/categorias', {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

export function useUpdateCategoryMutation({
  category,
}: Readonly<{ category: CategoryType }>) {
  return fetcher(`/parametros/categorias/${category.id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  })
}
