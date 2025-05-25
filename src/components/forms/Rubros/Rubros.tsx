import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import { useCreateRubroMutation } from '~/queries/parametros/rubros'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import { useUpdateRubroMutation } from '~redux/api/bca-backend/parametros/rubrosSlice'
import { type RubrosType, rubrosSchema } from '~types/rubros'

type RubrosFromProps = {
  rubro: RubrosType
  rubroId: string
}

function RubrosForm({ rubroId, rubro }: RubrosFromProps) {
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const [conflictError, setConflictError] = useState<string>('')
  const navigate = useNavigate()
  const [updateRubro] = useUpdateRubroMutation()
  const { control, handleSubmit } = useForm<RubrosType>({
    defaultValues: rubro,
    resolver: zodResolver(rubrosSchema),
  })
  const { mutate } = useMutation({
    mutationFn: useCreateRubroMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['items', data.id] })
      navigate(`/parametros/rubros/${data?.id}`)
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })

  async function hadleSubmit(data: RubrosType) {
    setConflictError('')
    if (rubroId?.toLowerCase() === 'crear') {
      mutate({ token, item: data })
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
