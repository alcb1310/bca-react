import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { GetAllCategories } from '@/queries/parametros/categories'
import { CreateMaterial } from '@/queries/parametros/materials'
import { useUpdateMaterialMutation } from '@/redux/api/bca-backend/parametros/materialsSlice'
import {
    type MaterialType,
    materialSchema,
    type MaterialCreateType,
} from '@/types/materials'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
    const queryClient = useQueryClient()
    const [conflictError, setConflictError] = useState<string>('')

    const { control, reset, handleSubmit } = useForm<MaterialType>({
        defaultValues,
        resolver: zodResolver(materialSchema),
    })

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categorias'],
        queryFn: () => GetAllCategories(),
    })

    const createMaterialMutation = useMutation({
        mutationFn: CreateMaterial,
        onSuccess: () => {
            onClose()
            toast.success('Material creado exitosamente')
        },
        onError: (error) => {
            setConflictError(error.message)
            toast.error(`Error al crear el material: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['materials'],
            })
        },
    })

    const [updateMaterial] = useUpdateMaterialMutation()

    useEffect(() => {
        reset(defaultValues)
        setConflictError('')
    }, [reset, defaultValues])

    async function hadleSubmit(data: MaterialType) {
        if (!defaultValues.id) {
            const material: MaterialCreateType = {
                code: data.code,
                name: data.name,
                unit: data.unit,
                category_id: data.category.id,
            }
            createMaterialMutation.mutate({ data: material })
            return
        }

        const res = await updateMaterial(data)
        if ('data' in res) {
            onClose()
            toast.success('Material actualizado exitosamente')
            return
        }

        // @ts-expect-error data is part of the response
        setConflictError(res.error.data.message)
        // @ts-expect-error data is part of the response
        toast.error(`Error al actualizar el material: ${res.error.data.message}`)
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
