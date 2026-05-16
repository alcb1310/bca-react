import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import { GetAllBudgetItems } from '@/queries/parametros/budgetItem'
import { CreateInvoiceDetail } from '@/queries/transacciones/invoiceDetails'
import {
    type InvoiceDetailsCreateType,
    invoiceDetailsCreateSchema,
} from '@/types/invoiceDetails'
import { calculateTotal } from '@/utils/math'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type InvoiceDetailsDrawerProps = {
    open: boolean
    onClose: () => void
    invoiceId: string
}

export default function InvoiceDetailsDrawer({
    open,
    onClose,
    invoiceId,
}: InvoiceDetailsDrawerProps) {
    const queryClient = useQueryClient()
    const [conflictError, setConflictError] = useState<string>('')

    const { data: budgetItems } = useQuery({
        queryKey: ['partidas'],
        queryFn: () => GetAllBudgetItems({ accum: false }),
    })

    const { control, reset, handleSubmit } = useForm<InvoiceDetailsCreateType>({
        defaultValues: { budget_item_id: '', quantity: 0, cost: 0, total: 0 },
        resolver: zodResolver(invoiceDetailsCreateSchema),
    })

    useEffect(() => {
        if (open) {
            reset({ budget_item_id: '', quantity: 0, cost: 0, total: 0 })
        }
    }, [reset, open])

    const results = useWatch({ control })
    const total = calculateTotal(results.quantity, results.cost)

    const createInvoiceDetailMutation = useMutation({
        mutationFn: CreateInvoiceDetail,
        onSuccess: async () => {
            toast.success('Detalle creado exitosamente')

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['invoice', invoiceId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['details', invoiceId],
                }),
            ])
        },
        onError: (error) => {
            toast.error('Error al crear el detalle')
            setConflictError(error.message)
        },
    })

    async function hadleSubmit(data: InvoiceDetailsCreateType) {
        setConflictError('')
        createInvoiceDetailMutation.mutate({ id: invoiceId, data })
    }

    return (
        <BcaDrawer open={open} onClose={onClose}>
            <DrawerTitle title={'Crear Detalle'} close={onClose} />
            <form onSubmit={handleSubmit(hadleSubmit)}>
                <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
                    {conflictError && (
                        <Typography color='error'>{conflictError}</Typography>
                    )}
                    <BcaSelect
                        datatestid='component.drawer.transaction.invoid.details.budget-item'
                        control={control}
                        name='budget_item_id'
                        label='Partida'
                    >
                        <option value=''>Seleccione una partida</option>
                        {budgetItems?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </BcaSelect>

                    <BcaTextField
                        control={control}
                        name='quantity'
                        datatestid='component.drawer.transaction.invoice.details.quantity'
                        label='Cantidad'
                    />

                    <BcaTextField
                        control={control}
                        name='cost'
                        label='Costo'
                        datatestid='component.drawer.transaction.invoice.details.cost'
                    />

                    <BcaTextField
                        datatestid='component.drawer.transaction.invoice.details.total'
                        control={control}
                        value={total}
                        name='total'
                        label='Total'
                        disabled
                    />

                    <ButtonGroup
                        saveFunction={handleSubmit(hadleSubmit)}
                        cancelFunction={onClose}
                    />
                </Stack>
            </form>
        </BcaDrawer>
    )
}
