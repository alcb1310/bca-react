import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Stack } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import BcaDateTextField from '~/components/input/BcaDateTextField/BcaDateTextField'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import ActualReportTable from '~/components/reports/ActualTable/ActualReportTable'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import {
  useGetAllHistoricQuery,
  useGetAllLevelsQuery,
} from '~/queries/reportes/comun'
import { loginStore } from '~/store/login'
import { normalizeDate } from '~/utils/date'
import { downloadExcelFile } from '~/utils/download'
import EditToolbar from '~components/table/headers/toolbar'

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

export default function Historic() {
  const token = useStore(loginStore, (state) => state.token)
  const queryClient = useQueryClient()
  const [selectedReport, setSelectedReport] = useState<{
    project_id: string
    level: string
    date: string
  }>({
    project_id: '',
    level: '',
    date: '',
  })
  const { control, handleSubmit } = useForm<ReportTypes>({
    defaultValues: {
      project_id: '',
      level: '',
      date: new Date(),
    },
    resolver: zodResolver(reportSchema),
  })

  const { data: levels } = useQuery({
    queryKey: ['levels'],
    queryFn: () => useGetAllLevelsQuery(),
  })
  const { data: budgets, isFetching } = useQuery({
    queryKey: ['historic'],
    queryFn: () =>
      useGetAllHistoricQuery({
        project_id: selectedReport.project_id,
        level: selectedReport.level,
        date: selectedReport.date,
      }),
    enabled: !!selectedReport.project_id && !!selectedReport.level,
  })

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => useGetAllProjectsQuery({}),
  })

  function generateReport(data: ReportTypes) {
    setSelectedReport({
      project_id: data.project_id,
      level: data.level,
      date: normalizeDate(data.date),
    })
    queryClient.invalidateQueries({ queryKey: ['historic'] })
    queryClient.setQueryData(
      ['historic'],
      useGetAllHistoricQuery({
        project_id: data.project_id,
        level: data.level,
        date: normalizeDate(data.date),
      }),
    )
  }

  async function exportReport(data: ReportTypes) {
    const url = import.meta.env.VITE_BACKEND_SERVER
    const date = normalizeDate(data.date)
    const res = await fetch(
      `${url}/reportes/excel/historico?proyecto=${data.project_id}&nivel=${data.level}&fecha=${date}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const blob = await res.blob()
    const filename =
      res.headers.get('Content-Disposition')?.split('filename=')[1] ||
      'excel-file.xlsx'

    downloadExcelFile(blob, filename)
  }

  return (
    <>
      <PageTitle title='Historico' />

      <form onSubmit={handleSubmit(generateReport)}>
        <Stack width='50%' direction='column' spacing={2} mx='auto' mt={2}>
          <BcaSelect
            datatestid='pages.reports.historic.project'
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

          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <BcaSelect
              datatestid='pages.reports.historic.level'
              name='level'
              label='Nivel'
              control={control}
            >
              <option value=''>Seleccione un nivel</option>
              {levels?.map((level) => (
                <option key={level.key} value={level.key}>
                  {level.value}
                </option>
              ))}
            </BcaSelect>

            <BcaDateTextField
              datatestid='pages.reports.historic.date'
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
            exportClick={handleSubmit(exportReport)}
          />
        </Stack>
        {isFetching && (
          <CircularProgress data-testid='pages.reports.historic.loading' />
        )}

        <ActualReportTable data={budgets!} />
      </form>
    </>
  )
}
