import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { CreateSupplier, UpdateSupplier } from '@/queries/parametros/supplier'
import { type SupplierType, supplierSchema } from '@/types/supplier'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type SupplierDrawerProps = {
    open: boolean
    onClose: () => void
    defaultValues: SupplierType
}

export default function SupplierDrawer({
    open,
    onClose,
    defaultValues,
}: SupplierDrawerProps) {
    const queryClient = useQueryClient()
    const [conflictError, setConflictError] = useState<string>('')
    const { control, reset, handleSubmit } = useForm<SupplierType>({
        defaultValues,
        resolver: zodResolver(supplierSchema),
    })

    const useCreateSupplierMutation = useMutation({
        mutationFn: CreateSupplier,
        onSuccess: () => {
            onClose()
            toast.success('Proveedor creado exitosamente')
        },
        onError: (error) => {
            setConflictError(error.message)
            toast.error(`Error al crear el proveedor: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },
    })

    const useUpdateSupplierMutation = useMutation({
        mutationFn: UpdateSupplier,
        onSuccess: () => {
            onClose()
            toast.success('Proveedor actualizado exitosamente')
        },
        onError: (error) => {
            setConflictError(error.message)
            toast.error(`Error al actualizar el proveedor: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },
    })

    useEffect(() => {
        reset(defaultValues)
    }, [reset, defaultValues])

    async function hadleSubmit(data: SupplierType) {
        if (!defaultValues.id) {
            useCreateSupplierMutation.mutate({ data })
            return
        }

        useUpdateSupplierMutation.mutate({ data })
    }

    return (
        <BcaDrawer open={open} onClose={onClose}>
            <DrawerTitle
                title={defaultValues.id ? 'Editar Proveedor' : 'Crear Proveedor'}
                close={onClose}
            />

            <form
                className='mt-5 flex flex-col gap-5'
                onSubmit={handleSubmit(hadleSubmit)}
            >
                {conflictError && (
                    <Typography color='error'>{conflictError}</Typography>
                )}
                <BcaTextField
                    datatestid='component.drawer.settings.supplier.supplier_id'
                    name='supplier_id'
                    control={control}
                    label='Ruc'
                />

                <BcaTextField
                    datatestid='component.drawer.settings.supplier.name'
                    name='name'
                    control={control}
                    label='Nombre'
                />

                <BcaTextField
                    name='contact_name'
                    datatestid='component.drawer.settings.supplier.contact_name'
                    control={control}
                    label='Nombre Contacto'
                />

                <BcaTextField
                    name='contact_email'
                    datatestid='component.drawer.settings.supplier.contact_email'
                    control={control}
                    label='Email Contacto'
                />

                <BcaTextField
                    name='contact_phone'
                    datatestid='component.drawer.settings.supplier.contact_phone'
                    control={control}
                    label='Telefono Contacto'
                />

                <ButtonGroup
                    saveFunction={handleSubmit(hadleSubmit)}
                    cancelFunction={onClose}
                />
            </form>
        </BcaDrawer>
    )
}
