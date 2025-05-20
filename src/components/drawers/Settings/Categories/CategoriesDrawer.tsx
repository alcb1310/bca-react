import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '~/queries/parametros/categories'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import { type CategoryType, categorySchema } from '~types/categories'

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
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const [conflictError, setConflictError] = useState<string>('')

  const { control, reset, handleSubmit } = useForm<CategoryType>({
    defaultValues,
    resolver: zodResolver(categorySchema),
  })

  const { mutate: createCategory } = useMutation({
    mutationFn: useCreateCategoryMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onClose()
      return
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  const { mutate } = useMutation({
    mutationFn: useUpdateCategoryMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onClose()
      return
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: should open only on open change
  useEffect(() => {
    reset(defaultValues)
  }, [open])

  async function hadleSubmit(data: CategoryType) {
    if (!defaultValues.id) {
      createCategory({ token, category: data })
      return
    }
    mutate({ token, category: data })
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={defaultValues.id ? 'Editar Categoria' : 'Crear Categorias'}
        close={onClose}
      />

      <Box mt={2}>
        <form
          className='w-full flex flex-col gap-5'
          onSubmit={handleSubmit(hadleSubmit)}
        >
          {conflictError && (
            <Typography color='error' sx={{ fontSize: '0.85rem' }}>
              {conflictError}
            </Typography>
          )}

          <BcaTextField
            name='name'
            label='Categoría'
            datatestid='component.drawer.settings.category.name'
            type='text'
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
