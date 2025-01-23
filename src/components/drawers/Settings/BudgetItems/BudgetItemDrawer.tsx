import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    CircularProgress,
    FormControlLabel,
    Typography,
} from '@mui/material'
import { DevTool } from '@hookform/devtools'

import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import ButtonGroup from '../../../buttons/button-group'
import BcaTextField from '../../../input/BcaTextField'
import { BudgetItem, budgetItemSchema } from '../../../../types/partidas'
import { RhfSwitch } from 'mui-rhf-integration'
import BcaSelect from '../../../input/BcaSelect'
import {
    useCreateBudgetItemMutation,
    useGetAllBudgetItemsQuery,
    useUpdateBudgetItemMutation,
} from '../../../../redux/api/bca-backend/parametros/budgetItemSlice'

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
    const { control, reset, handleSubmit } = useForm<BudgetItem>({
        defaultValues,
        resolver: zodResolver(budgetItemSchema),
    })
    const [conflictError, setConflictError] = useState<string>('')

    const [createBudgetItem] = useCreateBudgetItemMutation()
    const [updateBudgetItem] = useUpdateBudgetItemMutation()
    const { data, isLoading } = useGetAllBudgetItemsQuery({
        accum: true,
    })

    useEffect(() => {
        setConflictError('')
        reset(defaultValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    async function hadleSubmit(data: BudgetItem) {
        setConflictError('')
        if (defaultValues.id) {
            await updateBudgetItem(data)
            onClose()
            return
        }
        const res = await createBudgetItem(data)
        if ('data' in res) {
            onClose()
            return
        }

        // @ts-expect-error data property is part of the res.error object
        setConflictError(res.error.data.error)
    }

    return (
        <BcaDrawer open={open} onClose={onClose}>
            <DrawerTitle title='Crear Partida' close={onClose} />

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
                        name='code'
                        label='Código'
                        control={control}
                    />

                    <BcaTextField name='name' label='Nombre' control={control} />

                    <BcaSelect
                        name='parent_id'
                        label='Padre'
                        control={control}
                        disabled={defaultValues.id ? true : false}
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
