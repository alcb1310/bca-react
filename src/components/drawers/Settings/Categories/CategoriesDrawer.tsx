import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { CreateCategory } from '@/queries/parametros/categories'
import { useUpdateCategoryMutation } from '@/redux/api/bca-backend/parametros/categoriesSlice'
import { type CategoryType, categorySchema } from '@/types/categories'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
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
    const queryClient = useQueryClient()
    const [conflictError, setConflictError] = useState<string>('')

    const { control, reset, handleSubmit } = useForm<CategoryType>({
        defaultValues,
        resolver: zodResolver(categorySchema),
    })

    const [updateCategory] = useUpdateCategoryMutation()

    const createMutation = useMutation({
        mutationFn: CreateCategory,
        onSuccess: () => {
            toast.success('Categoría creada exitosamente')
            onClose()
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['categorias'],
            })
        },
    })

    useEffect(() => {
        reset(defaultValues)
    }, [reset, defaultValues])

    async function hadleSubmit(data: CategoryType) {
        if (!defaultValues.id) {
            createMutation.mutate({ data })
            return
        }

        const res = await updateCategory(data)
        if ('data' in res) {
            onClose()
            toast.success('Categoría actualizada exitosamente')
            return
        }
        // @ts-expect-error data property is part of the res.error object
        setConflictError(res.error.data.error)
        // @ts-expect-error data property is part of the res.error object
        toast.error(`Error al actualizar la categoría: ${res.error.data.error}`)
        return
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
