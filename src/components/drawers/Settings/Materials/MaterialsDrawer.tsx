import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { useGetAllCategoriesQuery } from '@/queries/parametros/categorias'
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from '@/queries/parametros/materiales'
import { type MaterialType, materialSchema } from '@/types/materials'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Typography } from '@mui/material'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type MaterialsDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: MaterialType
}

export default function MaterialsDrawer({
  open,
  onClose,
  defaultValues,
}: MaterialsDrawerProps) {
  const [conflictError, setConflictError] = useState<string>('')
  const queryClient = useQueryClient()

  const { control, reset, handleSubmit } = useForm<MaterialType>({
    defaultValues,
    resolver: zodResolver(materialSchema),
  })

  const { data: categories, isLoading } = useSuspenseQuery({
    queryKey: ['categorias'],
    queryFn: useGetAllCategoriesQuery,
  })
  const { mutate: createMaterial, isPending: isPendingCreate } = useMutation({
    mutationFn: useCreateMaterialMutation,
    onSuccess: () => {
      onClose()
      toast.success('Material creado exitosamente')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al crear el material: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['materiales'] })
    },
  })

  const { mutate: updateMaterial, isPending: isPendingUpdate } = useMutation({
    mutationFn: useUpdateMaterialMutation,
    onSuccess: () => {
      onClose()
      toast.success('Material actualizado exitosamente')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al actualizar el material: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['materiales'] })
    },
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  async function hadleSubmit(data: MaterialType) {
    switch (defaultValues.id) {
      case undefined:
        createMaterial({ material: data })
        break
      default:
        updateMaterial({ material: data })
        break
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={defaultValues.id ? 'Editar Material' : 'Crear Material'}
        close={onClose}
      />

      {(isLoading || isPendingCreate || isPendingUpdate) && (
        <CircularProgress />
      )}
      {conflictError && <Typography color='error'>{conflictError}</Typography>}

      <form
        className='mt-5 flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        <BcaTextField
          datatestid='component.drawer.setting.materials.code'
          name='code'
          label='Código'
          control={control}
        />

        <BcaTextField
          datatestid='component.drawer.setting.materials.name'
          name='name'
          label='Nombre'
          control={control}
        />

        <BcaTextField
          datatestid='component.drawer.setting.materials.unit'
          name='unit'
          label='Unidad'
          control={control}
        />

        <BcaSelect
          datatestid='component.drawer.setting.materials.category'
          name='category.id'
          label='Categoría'
          control={control}
        >
          <option value=''>Seleccione una categoría</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </BcaSelect>

        <ButtonGroup
          saveFunction={handleSubmit(hadleSubmit)}
          cancelFunction={onClose}
          disabled={isPendingCreate || isPendingUpdate}
        />
      </form>
    </BcaDrawer>
  )
}
