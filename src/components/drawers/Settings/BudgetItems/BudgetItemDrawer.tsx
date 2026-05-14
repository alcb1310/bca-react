import ButtonGroup from '@/components/buttons/button-group'
import BcaDrawer from '@/components/drawers/BcaDrawer/BcaDrawer'
import BcaSelect from '@/components/input/BcaSelect'
import BcaTextField from '@/components/input/BcaTextField'
import DrawerTitle from '@/components/titles/DrawerTitle'
import {
    CreateBudgetItem,
    GetAllBudgetItems,
} from '@/queries/parametros/budgetItem'
import { useUpdateBudgetItemMutation } from '@/redux/api/bca-backend/parametros/budgetItemSlice'
import { type BudgetItem, budgetItemSchema } from '@/types/partidas'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    CircularProgress,
    FormControlLabel,
    Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RhfSwitch } from 'mui-rhf-integration'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type BudgetItemDrawerProps = {
    open: boolean
    onClose: () => void
    defaultValues: BudgetItem
}

export default function BudgetItemDrawer({
    open,
    onClose,
    defaultValues,
}: BudgetItemDrawerProps) {
    const queryClient = useQueryClient()
    const { control, reset, handleSubmit } = useForm<BudgetItem>({
        defaultValues,
        resolver: zodResolver(budgetItemSchema),
    })
    const [conflictError, setConflictError] = useState<string>('')

    // const [createBudgetItem] = useCreateBudgetItemMutation()
    const [updateBudgetItem] = useUpdateBudgetItemMutation()

    const createBudgetItemMutation = useMutation({
        mutationFn: CreateBudgetItem,
        onSuccess: () => {
            onClose()
            toast.success('Partida creada')
        },
        onError: (error) => {
            setConflictError(error.message)
            toast.error(`Error al crear la partida: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['partidas'],
            })
        },
    })

    const { data, isLoading } = useQuery({
        queryKey: ['partidas', 'accum'],
        queryFn: () => GetAllBudgetItems({ accum: true }),
    })

    useEffect(() => {
        setConflictError('')
        reset(defaultValues)
    }, [reset, defaultValues])

    async function hadleSubmit(data: BudgetItem) {
        setConflictError('')
        if (defaultValues.id) {
            const res = await updateBudgetItem(data)

            if ('data' in res) {
                onClose()
                toast.success('Partida actualizada')
                return
            }
            // @ts-expect-error data property is part of the res.error object
            setConflictError(res.error.data.error)
            // @ts-expect-error data property is part of the res.error object
            toast.error(`Error al actualizar la partida: ${res.error.data.error}`)
        }

        createBudgetItemMutation.mutate({ data })
    }

    return (
        <BcaDrawer open={open} onClose={onClose}>
            <DrawerTitle
                title={defaultValues.id ? 'Editar Partida' : 'Crear Partida'}
                close={onClose}
            />

            <Box mt={2}>
                <form
                    className='w-full flex flex-col gap-5'
                    onSubmit={handleSubmit(hadleSubmit)}
                >
                    {isLoading && <CircularProgress />}
                    {conflictError && (
                        <Typography color='error' sx={{ fontSize: '0.85rem' }}>
                            {conflictError}
                        </Typography>
                    )}

                    <BcaTextField
                        datatestid='component.drawer.settings.budget.item.code'
                        name='code'
                        label='Código'
                        control={control}
                    />

                    <BcaTextField
                        datatestid='component.drawer.settings.budget.item.name'
                        name='name'
                        label='Nombre'
                        control={control}
                    />

                    <BcaSelect
                        name='parent_id'
                        datatestid='component.drawer.settings.budget.item.parent'
                        label='Padre'
                        control={control}
                        disabled={!!defaultValues.id}
                    >
                        <option value=''>Seleccione una partida</option>
                        {data?.map((budgetItem) => (
                            <option key={budgetItem.id} value={budgetItem.id}>
                                {budgetItem.name}
                            </option>
                        ))}
                    </BcaSelect>

                    <FormControlLabel
                        name='accumulates'
                        data-testid='component.drawer.settings.budget.item.accumulate'
                        labelPlacement='end'
                        label='Acumula'
                        control={
                            <RhfSwitch name='accumulate' control={control} size='small' />
                        }
                    />

                    <ButtonGroup
                        saveFunction={handleSubmit(hadleSubmit)}
                        cancelFunction={onClose}
                    />
                </form>
            </Box>
            <DevTool control={control} />
        </BcaDrawer>
    )
}
