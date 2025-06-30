import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/queries/parametros/categorias'
import { type CategoryType, categorySchema } from '@/types/categories'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
  const queryClient = useQueryClient()

  const { control, reset, handleSubmit } = useForm<CategoryType>({
    defaultValues,
    resolver: zodResolver(categorySchema),
  })

  const { mutate: createCategory, isPending: isPendingCreate } = useMutation({
    mutationFn: useCreateCategoryMutation,
    onSuccess: () => {
      onClose()
      toast.success('Categoría creada exitosamente')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al crear la categoría: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    },
  })

  const { mutate: updateCategory, isPending: isPendingUpdate } = useMutation({
    mutationFn: useUpdateCategoryMutation,
    onSuccess: () => {
      onClose()
      toast.success('Categoría actualizada exitosamente')
    },
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al actualizar la categoría: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    },
  })

  useEffect(() => {
    reset(defaultValues)
    setConflictError('')
  }, [reset, defaultValues])

  async function hadleSubmit(data: CategoryType) {
    switch (defaultValues.id) {
      case undefined:
        createCategory({ category: data })
        break
      default:
        updateCategory({ category: data })
        break
    }
    // if (!defaultValues.id) {
    //   createCategory({ category: data })
    //   return
    // }
    // updateCategory({ category: data })
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
          {(isPendingCreate || isPendingUpdate) && <CircularProgress />}
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
            disabled={isPendingCreate || isPendingUpdate}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
