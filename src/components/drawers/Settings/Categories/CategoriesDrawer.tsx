import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import DrawerTitle from '~components/titles/DrawerTitle'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import BcaTextField from '~components/input/BcaTextField'
import { categorySchema, CategoryType } from '~types/categories'
import ButtonGroup from '~components/buttons/button-group'
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} from '~redux/api/bca-backend/parametros/categoriesSlice'

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
        resolver: zodResolver(categorySchema),
    })

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()

    useEffect(() => {
        reset(defaultValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    async function hadleSubmit(data: CategoryType) {
        if (!defaultValues.id) {
            const res = await createCategory(data)
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

        const res = await updateCategory(data)
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
