// BUG: In the Pages/Cierre page, when searching the invoices with a date with a one digit day, there is an error when querying the API

import { useState } from 'react'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'

import PageTitle from '~components/titles/PageTitle'
import { useGetAllProjectsQuery } from '~redux/api/bca-backend/parametros/projectsSlice'
import { cierreSchema, CierreTypes } from '~types/cierre'
import BcaSelect from '~components/input/BcaSelect'
import BcaDateTextField from '~components/input/BcaDateTextField'
import ConfirmationDialog from '~components/dialog/ConfirmationDialog'
import { useCreateClosureMutation } from '~redux/api/bca-backend/transacciones/closureSlice'

export default function Cierre() {
    const [open, setOpen] = useState<boolean>(false)
    const [conflictError, setConflictError] = useState<string>('')
    const [cierreData, setCierreData] = useState<CierreTypes | null>(null)
    const { data: projects, isLoading } = useGetAllProjectsQuery({ active: true })
    const { control, handleSubmit } = useForm<CierreTypes>({
        defaultValues: {
            project_id: '',
            // @ts-expect-error default value is empty
            date: '',
        },
        resolver: zodResolver(cierreSchema),
    })
    const [generateCierre] = useCreateClosureMutation()

    function hadleSubmit(data: CierreTypes) {
        setCierreData(data)
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
                    message={`Desea generar el cierre`}
                    confirm={async () => {
                        const res = await generateCierre(cierreData!)
                        if ('error' in res) {
                            // @ts-expect-error error property is part of the res.error object
                            setConflictError(res.error.data.error)
                        }
                        setOpen(false)
                    }}
                />
            )}
            <DevTool control={control} />
        </>
    )
}
