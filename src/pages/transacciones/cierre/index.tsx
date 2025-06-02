// BUG: In the Pages/Cierre page, when searching the invoices with a date with a one digit day, there is an error when querying the API
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import BcaDateTextField from '~/components/input/BcaDateTextField/BcaDateTextField'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useCreateClosureMutation } from '~/queries/transacciones/cierre'
import { normalizeDate } from '~/utils/date'
import ConfirmationDialog from '~components/dialog/ConfirmationDialog'
import { type CierreTypes, cierreSchema } from '~types/cierre'

export default function Cierre() {
  const [open, setOpen] = useState<boolean>(false)
  const [conflictError, setConflictError] = useState<string>('')
  const [cierreData, setCierreData] = useState<CierreTypes | null>(null)
  const { control, handleSubmit } = useForm<CierreTypes>({
    defaultValues: {
      project_id: '',
      // @ts-expect-error default value is empty
      date: '',
    },
    resolver: zodResolver(cierreSchema),
  })
  const { mutate } = useMutation({
    mutationFn: useCreateClosureMutation,
    onError: (error) => {
      setConflictError(error.message)
      toast.error(`Error al ejecutar el cierre: ${error.message}`)
    },
    onSuccess: () => {
      setConflictError('')
      toast.success('Cierre completado')
    },
    onSettled: () => {
      setOpen(false)
    },
  })
  const { data: projects, isLoading } = useSuspenseQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => useGetAllProjectsQuery({ active: true }),
  })

  function hadleSubmit(data: CierreTypes) {
    const dateString = normalizeDate(data.date)
    setCierreData({
      project_id: data.project_id,
      // @ts-expect-error testing fix purposes
      date: dateString,
    })
    setOpen(true)
  }

  return (
    <>
      <PageTitle title='Cierre de Mes' />

      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack width='50%' direction='column' spacing={2} mx='auto' mt={2}>
          {isLoading && (
            <CircularProgress data-testid='page.transactions.closure.loading' />
          )}
          {conflictError && (
            <Typography color='error'>{conflictError}</Typography>
          )}

          <BcaSelect
            datatestid='page.transactions.closure.project'
            name='project_id'
            control={control}
          >
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>

          <BcaDateTextField
            datatestid='page.transactions.closure.date'
            name='date'
            control={control}
            label='Fecha'
          />

          <Box>
            <Button
              variant='contained'
              data-testid='page.transactions.closure.generate'
              startIcon={<SaveOutlined />}
              color='primary'
              onClick={handleSubmit(hadleSubmit)}
              type='submit'
              size='small'
            >
              Generar Cierre
            </Button>
          </Box>
        </Stack>
      </form>
      {open && (
        <ConfirmationDialog
          data-testid='page.transactions.closure.dialog'
          open={open}
          setOpen={setOpen}
          message={'Desea generar el cierre'}
          confirm={async () => {
            mutate({ cierre: cierreData! })
          }}
        />
      )}
      <DevTool control={control} />
    </>
  )
}
