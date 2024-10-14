import { useEffect } from 'react'
import { Box, Button, CircularProgress, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetOneRubroQuery } from '../../../../redux/api/bca-backend/parametros/rubrosSlice'
import { useForm } from 'react-hook-form'
import { RubrosType } from '../../../../types/rubros'
import BcaTextField from '../../../../components/input/BcaTextField'
import PageTitle from '../../../../components/titles/PageTitle'
import { AddOutlined, CancelOutlined, SaveOutlined } from '@mui/icons-material'

export default function IndividualItem() {
  const { rubroId } = useParams()
  const { data: rubro, isLoading } = useGetOneRubroQuery(rubroId!)

  const { control, reset, handleSubmit } = useForm<RubrosType>({
    defaultValues: rubro,
  })
  const navigate = useNavigate()

  useEffect(() => {
    reset(rubro)
  }, [rubro, reset])

  function hadleSubmit(data: RubrosType) {
    console.log(data)
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
