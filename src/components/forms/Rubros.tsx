import ButtonGroup from '@/components/buttons/button-group'
import BcaTextField from '@/components/input/BcaTextField'
import { CreateRubro } from '@/queries/parametros/rubros'
import { useUpdateRubroMutation } from '@/redux/api/bca-backend/parametros/rubrosSlice'
import { type RubrosType, rubrosSchema } from '@/types/rubros'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type RubrosFromProps = {
    rubro: RubrosType
    rubroId: string
}

function RubrosForm({ rubroId, rubro }: RubrosFromProps) {
    const queryClient = useQueryClient()
    const [conflictError, setConflictError] = useState<string>('')
    const navigate = useNavigate()
    const [updateRubro] = useUpdateRubroMutation()
    const { control, handleSubmit } = useForm<RubrosType>({
        defaultValues: rubro,
        resolver: zodResolver(rubrosSchema),
    })

    const createRubroMutation = useMutation({
        mutationFn: CreateRubro,
        onSuccess: (data) => {
            toast.success('Rubro creado exitosamente')
            navigate(`/parametros/rubros/${data?.id}`)
        },
        onError: (error) => {
            toast.error(`Error al crear el rubro: ${error.message}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['rubros'],
            })
        },
    })

    async function hadleSubmit(data: RubrosType) {
        setConflictError('')
        if (rubroId?.toLowerCase() === 'crear') {
            createRubroMutation.mutate({ data })
            return
        }

        const res = await updateRubro(data)
        if ('error' in res) {
            // @ts-expect-error data is a property of the error object
            setConflictError(res.error.data.error)
            // @ts-expect-error data is a property of the error object
            toast.error(`Error al crear el rubro: ${res.error.data.error}`)
            return
        }

        toast.success('Rubro actualizado exitosamente')
    }
    return (
        <>
            <form onSubmit={handleSubmit(hadleSubmit)}>
                <Stack direction={'column'} spacing={2}>
                    {conflictError && (
                        <Typography color='error'>{conflictError}</Typography>
                    )}
                    <BcaTextField
                        datatestid='component.form.rubro.code'
                        control={control}
                        name='code'
                        label='Código'
                    />

                    <BcaTextField
                        datatestid='component.form.rubro.name'
                        control={control}
                        name='name'
                        label='Nombre'
                    />

                    <BcaTextField
                        datatestid='component.form.rubro.unit'
                        control={control}
                        name='unit'
                        label='Unidad'
                    />

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
