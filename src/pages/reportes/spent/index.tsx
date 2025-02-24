import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CircularProgress, Grid2, Stack, Typography } from '@mui/material'

import PageTitle from '@/components/titles/PageTitle/PageTitle'
import { useGetAllProjectsQuery } from '@redux/api/bca-backend/parametros/projectsSlice'
import {
    useGetAllLevelsQuery,
    useGetSpentQuery,
} from '@redux/api/bca-backend/reports/commonSlice'
import BcaSelect from '@/components/input/BcaSelect/BcaSelect'
import BcaDateTextField from '@/components/input/BcaDateTextField/BcaDateTextField'
import EditToolbar from '@components/table/headers/toolbar'
import SpentTable from '@/components/reports/SpentTable/SpentTable'
import SpentDetailsDrawer from '@components/drawers/Reports/Spent/SpentDetailsDrawer'
import { Spent as SpentType } from '@/types/reports'
import { useAppSelector } from '@redux/hooks'
import { downloadExcelFile } from '@/utils/download'
import { normalizeDate } from '@/utils/date'

const reportSchema = z.object({
    project_id: z
        .string({ message: 'Seleccione un proyecto' })
        .uuid('Seleccione un proyecto'),
    level: z
        .string({ message: 'Seleccione un nivel' })
        .min(1, 'Seleccione un nivel'),
    date: z.coerce.date({
        message: 'Ingrese una fecha',
    }),
})
type ReportTypes = z.infer<typeof reportSchema>

export default function Spent() {
    const [selectedReport, setSelectedReport] = useState<{
        project_id: string
        level: string
        date: string
    }>({
        project_id: '',
        level: '',
        date: '',
    })
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<SpentType | undefined>(undefined)

    const token = useAppSelector((state) => state.login.token)

    const { control, handleSubmit } = useForm<ReportTypes>({
        defaultValues: {
            project_id: '',
            level: '',
            date: new Date(),
        },
        resolver: zodResolver(reportSchema),
    })

    const { data: projects } = useGetAllProjectsQuery({})
    const { data: levels } = useGetAllLevelsQuery()
    const { data, isFetching } = useGetSpentQuery(selectedReport!)

    function generateReport(info: ReportTypes) {
        const date = normalizeDate(info.date)
        const reportData = {
            project_id: info.project_id,
            level: info.level,
            date,
        }
        setSelectedReport(reportData)
    }

    async function exportClick(info: ReportTypes) {
        const url = import.meta.env.VITE_BACKEND_SERVER
        const date = normalizeDate(info.date)

        try {
            const res = await fetch(
                `${url}/reportes/excel/gastado?proyecto=${info.project_id}&nivel=${info.level}&fecha=${date}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const blob = await res.blob()
            const filename =
                res.headers.get('Content-Disposition')?.split('filename')[1] ||
                'excel-file.xlsx'

            downloadExcelFile(blob, filename)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <PageTitle title='Gastado por partida' />
            <form onSubmit={handleSubmit(generateReport)}>
                <Stack width='50%' direction={'column'} spacing={2} mx={'auto'} mt={2}>
                    <BcaSelect
                        datatestid='page.reports.spent.project'
                        name='project_id'
                        label='Proyecto'
                        control={control}
                    >
                        <option value=''>Seleccione un proyecto</option>
                        {projects?.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </BcaSelect>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <BcaSelect
                            datatestid='page.reports.spent.level'
                            name='level'
                            label='Nivel'
                            control={control}
                        >
                            <option value=''>Seleccione un nivel</option>
                            {levels?.map((level) => (
                                <option key={level.key} value={level.key}>
                                    {level.value}{' '}
                                </option>
                            ))}
                        </BcaSelect>

                        <BcaDateTextField
                            datatestid='page.reports.spent.date'
                            control={control}
                            name='date'
                            label='Fecha'
                        />
                    </Stack>

                    <EditToolbar
                        title='Generar'
                        onClick={handleSubmit(generateReport)}
                        color='primary'
                        hasExportButton
                        exportClick={handleSubmit(exportClick)}
                    />
                </Stack>
            </form>

            {!!data && (
                <Grid2 container spacing={2} mt={2}>
                    <Typography variant='body1' component='h5' textAlign='left' pl={1}>
                        Total:{' '}
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                            component='span'
                            sx={{ color: 'success.main' }}
                        >
                            {data.total.toLocaleString('es-EC', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </Typography>
                    </Typography>
                </Grid2>
            )}

            {isFetching && (
                <CircularProgress data-testid='page.reports.spent.loading' />
            )}
            <SpentTable data={data!} setOpen={setOpen} setSelected={setSelected} />

            {!!data && (
                <Grid2 container spacing={2} mt={2}>
                    <Typography variant='body1' component='h5' textAlign='left' pl={1}>
                        Total:{' '}
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                            component='span'
                            sx={{ color: 'success.main' }}
                        >
                            {data.total.toLocaleString('es-EC', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </Typography>
                    </Typography>
                </Grid2>
            )}

            {open && (
                <SpentDetailsDrawer
                    setOpen={() => setOpen(false)}
                    open={open}
                    selectedData={selected!}
                    selectedProject={selectedReport.project_id!}
                    selectedDate={selectedReport.date!}
                />
            )}
        </>
    )
}
