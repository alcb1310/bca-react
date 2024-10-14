import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CircularProgress, MenuItem, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'

import { materialSchema, MaterialType } from '../../../../types/materials'
import ButtonGroup from '../../../buttons/button-group'
import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import BcaTextField from '../../../input/BcaTextField'
import BcaSelect from '../../../input/BcaSelect'
import { useGetAllCategoriesQuery } from '../../../../redux/api/bca-backend/parametros/categoriesSlice'
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from '../../../../redux/api/bca-backend/parametros/materialsSlice'

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

  const { control, reset, handleSubmit } = useForm<MaterialType>({
    defaultValues,
    resolver: zodResolver(materialSchema),
  })

  const { data: categories, isLoading } = useGetAllCategoriesQuery()
  const [createMaterial] = useCreateMaterialMutation()
  const [updateMaterial] = useUpdateMaterialMutation()

  useEffect(() => {
    reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function hadleSubmit(data: MaterialType) {
    if (!defaultValues.id) {
      const res = await createMaterial(data)
      if ('data' in res) {
        onClose()
        return
      }

      // @ts-expect-error data is part of the response
      setConflictError(res.error.data.message)
      return
    }

    const res = await updateMaterial(data)
    if ('data' in res) {
      onClose()
      return
    }

    // @ts-expect-error data is part of the response
    setConflictError(res.error.data.message)
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title='Crear Material' close={onClose} />

      {isLoading && <CircularProgress />}
      {conflictError && <Typography color='error'>{conflictError}</Typography>}

      <form
        className='mt-5 flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        <BcaTextField name='code' label='Código' control={control} />

        <BcaTextField name='name' label='Nombre' control={control} />

        <BcaTextField name='unit' label='Unidad' control={control} />

        <BcaSelect name='category.id' label='Categoría' control={control}>
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
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
