import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { CreateCategory, UpdateCategory } from '@/queries/parametros/categories'
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

    const createMutation = useMutation({
        mutationFn: CreateCategory,
        onSuccess: () => {
            toast.success('Categoría creada exitosamente')
            onClose()
        },
        onError: (error) => {
            toast.error(error.message)
            setConflictError(error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['categorias'],
            })
        },
    })

    const updateMutation = useMutation({
        mutationFn: UpdateCategory,
        onSuccess: () => {
            toast.success('Categoría actualizada exitosamente')
            onClose()
        },
        onError: (error) => {
            toast.error(error.message)
            setConflictError(error.message)
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

        updateMutation.mutate({ data })
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
