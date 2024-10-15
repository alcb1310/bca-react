import { useEffect } from 'react'
import { Box, Button, CircularProgress, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateRubroMutation, useGetOneRubroQuery } from '../../../../redux/api/bca-backend/parametros/rubrosSlice'
import { useForm } from 'react-hook-form'
import { rubrosSchema, RubrosType } from '../../../../types/rubros'
import BcaTextField from '../../../../components/input/BcaTextField'
import PageTitle from '../../../../components/titles/PageTitle'
import { AddOutlined, CancelOutlined, SaveOutlined } from '@mui/icons-material'
import { zodResolver } from '@hookform/resolvers/zod'

export default function IndividualItem() {
  const { rubroId } = useParams()
  const { data: rubro, isLoading } = useGetOneRubroQuery(rubroId!)

  const { control, reset, handleSubmit } = useForm<RubrosType>({
    defaultValues: rubro,
    resolver: zodResolver(rubrosSchema)
  })
  const navigate = useNavigate()
  const [createRubro] = useCreateRubroMutation()

  useEffect(() => {
    reset(rubro)
  }, [rubro, reset])

  async function hadleSubmit(data: RubrosType) {
    if (rubroId?.toLowerCase() === 'crear'){
      // INFO: we are creating a new rubro
      const res = await createRubro(data)
      if ('data' in res) {
        navigate(`/parametros/rubros/${res.data?.id}`)
        return
      }
      return
    }

    // INFO: we are updating a rubro
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

              {rubroId?.toLowerCase() !== 'crear' && (
                <Button
                  variant='contained'
                  size='small'
                  color='success'
                  startIcon={<AddOutlined />}
                >
                  Material
                </Button>
              )}

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
    </>
  )
}
