import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import { useGetAllCategoriesQuery } from '~/queries/parametros/categorias'
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from '~/queries/parametros/materiales'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import { type MaterialType, materialSchema } from '~types/materials'

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
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const [conflictError, setConflictError] = useState<string>('')

  const { control, reset, handleSubmit } = useForm<MaterialType>({
    defaultValues,
    resolver: zodResolver(materialSchema),
  })

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => useGetAllCategoriesQuery({ token }),
  })
  const { mutate: createMaterial } = useMutation({
    mutationFn: useCreateMaterialMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      onClose()
      toast.success('Material creado')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al crear el material: ${error.message}`)
    },
  })
  const { mutate: updateMaterial } = useMutation({
    mutationFn: useUpdateMaterialMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      onClose()
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  useEffect(() => {
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: MaterialType) {
    if (!defaultValues.id) {
      createMaterial({ token, material: data })
      return
    }

    updateMaterial({ token, material: data })
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={defaultValues.id ? 'Editar Material' : 'Crear Material'}
        close={onClose}
      />

      {isLoading && <CircularProgress />}
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
        />
      </form>
    </BcaDrawer>
  )
}
