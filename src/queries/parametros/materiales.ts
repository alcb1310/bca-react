import type { MaterialType } from '@/types/materials'
import { fetcher } from '@/utils/fetch'

export function useCreateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  const data = {
    ...material,
    category_id: material.category.id,
  }

  return fetcher<MaterialType>('/parametros/materiales', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function useUpdateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  const data = {
    ...material,
    category_id: material.category.id,
  }
  return fetcher(`/parametros/materiales/${material.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function useGetAllMaterialsQuery() {
  return fetcher<MaterialType[]>('/parametros/materiales', {
    method: 'GET',
  })
}
