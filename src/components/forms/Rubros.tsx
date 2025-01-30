import { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import BcaTextField from '../input/BcaTextField'
import { rubrosSchema, RubrosType } from '../../types/rubros'
import { useNavigate } from 'react-router-dom'
import {
    useCreateRubroMutation,
    useUpdateRubroMutation,
} from '../../redux/api/bca-backend/parametros/rubrosSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ButtonGroup from '../buttons/button-group'

type RubrosFromProps = {
    rubro: RubrosType
    rubroId: string
}

function RubrosForm({ rubroId, rubro }: RubrosFromProps) {
    const [conflictError, setConflictError] = useState<string>('')
    const navigate = useNavigate()
    const [createRubro] = useCreateRubroMutation()
    const [updateRubro] = useUpdateRubroMutation()
    const { control, handleSubmit } = useForm<RubrosType>({
        defaultValues: rubro,
        resolver: zodResolver(rubrosSchema),
    })

    async function hadleSubmit(data: RubrosType) {
        setConflictError('')
        if (rubroId?.toLowerCase() === 'crear') {
            const res = await createRubro(data)
            if ('data' in res) {
                navigate(`/parametros/rubros/${res.data?.id}`)
                return
            }

            // @ts-expect-error data is a property of the error object
            setConflictError(res.error.data.error)
            return
        }

        const res = await updateRubro(data)
        if ('error' in res) {
            // @ts-expect-error data is a property of the error object
            setConflictError(res.error.data.error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(hadleSubmit)}>
                <Stack direction={'column'} spacing={2}>
                    {conflictError && (
                        <Typography color='error'>{conflictError}</Typography>
                    )}
                    <BcaTextField control={control} name='code' label='Código' />
                    <BcaTextField control={control} name='name' label='Nombre' />
                    <BcaTextField control={control} name='unit' label='Unidad' />

                    <ButtonGroup
                        saveFunction={handleSubmit(hadleSubmit)}
                        cancelFunction={() => navigate('/parametros/rubros')}
                    />
                </Stack>
            </form>
        </>
    )
}

export default RubrosForm
