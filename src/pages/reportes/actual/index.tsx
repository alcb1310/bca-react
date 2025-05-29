import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Stack } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import BcaSelect from '~/components/input/BcaSelect/BcaSelect'
import ActualReportTable from '~/components/reports/ActualTable/ActualReportTable'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllLevelsQuery } from '~/queries/reportes/comun'
import { useGetAllBudgetsByProjectAndLevelQuery } from '~/queries/transacciones/presupuesto'
import { downloadExcelFile } from '~/utils/download'
import EditToolbar from '~components/table/headers/toolbar'
import { useAppSelector } from '~redux/hooks'

const reportSchema = z.object({
  project_id: z
    .string({ message: 'Seleccione un proyecto' })
    .uuid('Seleccione un proyecto'),
  level: z
    .string({ message: 'Seleccione un nivel' })
    .min(1, 'Seleccione un nivel'),
})

type ReportTypes = z.infer<typeof reportSchema>

export default function Actual() {
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm<ReportTypes>({
    resolver: zodResolver(reportSchema),
  })
  const { data: projects } = useQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => useGetAllProjectsQuery({ token, active: true }),
  })
  const { data: levels } = useQuery({
    queryKey: ['levels'],
    queryFn: () => useGetAllLevelsQuery({ token }),
  })
  const [selectedReport, setSelectedReport] = useState<ReportTypes>({
    project_id: '',
    level: '',
  })
  const { data, isFetching } = useQuery({
    enabled: selectedReport.project_id !== '' && selectedReport.level !== '',
    queryKey: ['actual'],
    queryFn: () =>
      useGetAllBudgetsByProjectAndLevelQuery({
        token,
        project_id: selectedReport.project_id,
        level: selectedReport.level,
      }),
  })

  function hadleSubmit(data: ReportTypes) {
    setSelectedReport(data)
    queryClient.invalidateQueries({ queryKey: ['actual'] })
  }

  async function exportClick(data: ReportTypes) {
    const url = import.meta.env.VITE_BACKEND_SERVER
    const res = await fetch(
      `${url}/reportes/excel/actual?proyecto=${data.project_id}&nivel=${data.level}`,
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
      <PageTitle title='Actual' />
      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack width='50%' direction='column' spacing={2} mx='auto' mt={2}>
          <BcaSelect
            datatestid='page.reports.actual.project'
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
          <BcaSelect
            datatestid='page.reports.actual.level'
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

          <EditToolbar
            title='Generar'
            onClick={handleSubmit(hadleSubmit)}
            color='primary'
            hasExportButton
            exportClick={handleSubmit(exportClick)}
          />
        </Stack>
      </form>
      {isFetching && (
        <CircularProgress data-testid='page.reports.actual.loading' />
      )}

      <ActualReportTable data={data!} />
    </>
  )
}
