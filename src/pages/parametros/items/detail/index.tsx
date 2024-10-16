import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  useCreateRubroMutation,
  useGetOneRubroQuery,
  useUpdateRubroMutation,
} from '../../../../redux/api/bca-backend/parametros/rubrosSlice'
import { useForm } from 'react-hook-form'
import { rubrosSchema, RubrosType } from '../../../../types/rubros'
import BcaTextField from '../../../../components/input/BcaTextField'
import PageTitle from '../../../../components/titles/PageTitle'
import { CancelOutlined, SaveOutlined } from '@mui/icons-material'
import EditToolbar from '../../../../components/table/headers/toolbar'
import AllRubrosMaterialsTable from '../../../../components/settings/rubros/AllRubrosMaterialsTable'
import RubroMaterialsDrawer from '../../../../components/drawers/Settings/RubroMaterial/RubroMaterialsDrawer'

export default function IndividualItem() {
  const [open, setOpen] = useState<boolean>(false)
  const [conflictError, setConflictError] = useState<string>('')
  const { rubroId } = useParams()
  const { data: rubro, isLoading } = useGetOneRubroQuery(rubroId!)

  const { control, reset, handleSubmit } = useForm<RubrosType>({
    defaultValues: rubro,
    resolver: zodResolver(rubrosSchema),
  })
  const navigate = useNavigate()
  const [createRubro] = useCreateRubroMutation()
  const [updateRubro] = useUpdateRubroMutation()

  useEffect(() => {
    reset(rubro)
  }, [rubro])

  async function hadleSubmit(data: RubrosType) {
    setConflictError('')
    if (rubroId?.toLowerCase() === 'crear') {
      // INFO: we are creating a new rubr
      const res = await createRubro(data)
      if ('data' in res) {
        navigate(`/parametros/rubros/${res.data?.id}`)
        return
      }

      // @ts-expect-error data is a property of the error object
      setConflictError(res.error.data.error)
      return
    }

    // INFO: we are updating a rubro
    const res = await updateRubro(data)
    if ('error' in res) {
      // @ts-expect-error data is a property of the error object
      setConflictError(res.error.data.error)
    }
  }

  return (
    <>
      <PageTitle
        title={
          rubroId?.toLowerCase() === 'crear' ? 'Crear rubro' : 'Editar rubro'
        }
      />

      {isLoading && <CircularProgress />}
      <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
        <form onSubmit={handleSubmit(hadleSubmit)}>
          <Stack direction={'column'} spacing={2}>
            {conflictError && (
              <Typography color='error'>{conflictError}</Typography>
            )}
            <BcaTextField control={control} name='code' label='Código' />
            <BcaTextField control={control} name='name' label='Nombre' />
            <BcaTextField control={control} name='unit' label='Unidad' />

            <Stack direction={'row'} justifyContent='space-between'>
              <Button
                variant='contained'
                type='submit'
                size='small'
                color='primary'
                startIcon={<SaveOutlined />}
                onClick={handleSubmit(hadleSubmit)}
              >
                Guardar
              </Button>
              <Button
                variant='outlined'
                size='small'
                color='primary'
                startIcon={<CancelOutlined />}
                onClick={() => navigate('/parametros/rubros')}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>

      {rubroId?.toLowerCase() !== 'crear' && (
        <Box sx={{ mt: 2 }}>
          <EditToolbar
            title='Agregar Material'
            onClick={() => setOpen(true)}
            color='success'
          />
          <AllRubrosMaterialsTable rubroId={rubroId!} />
          <RubroMaterialsDrawer
            open={open}
            onClose={() => setOpen(false)}
            defaultValues={{
              item_id: rubroId!,
              material_id: '',
              quantity: 0,
            }}
          />
        </Box>
      )}
    </>
  )
}
