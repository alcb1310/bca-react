import type { MaterialType } from '@/types/materials'
import { fetcher } from '@/utils/fetch'

export function useCreateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  return fetcher<MaterialType>('/parametros/materiales', {
    method: 'POST',
    body: JSON.stringify(material),
  })
}

export function useUpdateMaterialMutation({
  material,
}: Readonly<{ material: MaterialType }>) {
  return fetcher(`/parametros/materiales/${material.id}`, {
    method: 'PUT',
    body: JSON.stringify(material),
  })
}

export function useGetAllMaterialsQuery() {
  return fetcher<MaterialType[]>('/parametros/materiales', {
    method: 'GET',
  })
}
