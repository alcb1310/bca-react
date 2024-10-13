import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import BcaTextField from '../../../input/BcaTextField'
import { useForm } from 'react-hook-form'
import { CategoryType } from '../../../../types/categories'
import ButtonGroup from '../../../buttons/button-group'
import { useCreateCategoryMutation } from '../../../../redux/api/bca-backend/parametros/categoriesSlice'

type CategoriesDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: CategoryType
}

export default function CategoriesDrawer({
  open,
  onClose,
  defaultValues,
}: CategoriesDrawerProps) {
  const [conflictError, setConflictError] = useState<string>('')

  const { control, reset, handleSubmit } = useForm<CategoryType>({
    defaultValues,
  })

  const [createCategory] = useCreateCategoryMutation()

  useEffect(() => {
    reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function hadleSubmit(data: CategoryType) {
    if (!defaultValues.id) {
      const res = await createCategory(data)
      console.log(res)
      if ('data' in res) {
        onClose()
        return
      }

      if ('error' in res) {
        // @ts-expect-error data property is part of the res.error object
        setConflictError(res.error.data.error)
        return
      }
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title="Crear Categorias" close={onClose} />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          {conflictError && (
            <Typography color="error" sx={{ fontSize: '0.85rem' }}>
              {conflictError}
            </Typography>
          )}

          <BcaTextField
            name="name"
            label="Categoría"
            type="text"
            control={control}
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
