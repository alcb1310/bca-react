import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { supplierSchema, SupplierType } from '../../../../types/supplier'
import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import BcaTextField from '../../../input/BcaTextField'
import ButtonGroup from '../../../buttons/button-group'
import {
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
} from '../../../../redux/api/bca-backend/parametros/supplierSlice'
import { Typography } from '@mui/material'

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
    const [conflictError, setConflictError] = useState<string>('')
    const { control, reset, handleSubmit } = useForm<SupplierType>({
        defaultValues,
        resolver: zodResolver(supplierSchema),
    })

    const [createSupplier] = useCreateSupplierMutation()
    const [updateSupplier] = useUpdateSupplierMutation()

    useEffect(() => {
        reset(defaultValues)
    }, [open])

    async function hadleSubmit(data: SupplierType) {
        if (!defaultValues.id) {
            const res = await createSupplier(data)
            if ('data' in res) {
                onClose()
                reset
            }

            // @ts-expect-error data is a property of the error message
            setConflictError(res.error.data.error)
            return
        }
        const res = await updateSupplier(data)
        if ('data' in res) {
            onClose()
            return
        }

        // @ts-expect-error data is a property of the error message
        setConflictError(res.error.data.error)
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
