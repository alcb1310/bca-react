import { z } from 'zod'
import PageTitle from '../../../components/titles/PageTitle'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Stack } from '@mui/material'
import BcaSelect from '../../../components/input/BcaSelect'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import {
  useGetAllHistoricQuery,
  useGetAllLevelsQuery,
} from '../../../redux/api/bca-backend/reports/common'
import EditToolbar from '../../../components/table/headers/toolbar'
import BcaDateTextField from '../../../components/input/BcaDateTextField'
import ActualTable from '../../../components/reports/ActualTable'
import { useState } from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { downloadExcelFile } from '../../../utils/download'

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

  const { data: projects } = useGetAllProjectsQuery({})
  const { data: levels } = useGetAllLevelsQuery()
  const { data: budgets, isLoading } = useGetAllHistoricQuery(selectedReport)
  const token = useAppSelector((state) => state.login.token)

  function generateReport(data: ReportTypes) {
    const reportData = {
      project_id: data.project_id,
      level: data.level,
      date: `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`,
    }
    setSelectedReport(reportData)
  }

  async function exportReport(data: ReportTypes) {
    const url = import.meta.env.VITE_BACKEND_SERVER
    const date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`
    const res = await fetch(
      `${url}/reportes/excel/historico?proyecto=${data.project_id}&nivel=${data.level}&fecha=${date}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
          <BcaSelect name='project_id' label='Proyecto' control={control}>
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>

          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <BcaSelect name='level' label='Nivel' control={control}>
              <option value=''>Seleccione un nivel</option>
              {levels?.map((level) => (
                <option key={level.key} value={level.key}>
                  {level.value}
                </option>
              ))}
            </BcaSelect>

            <BcaDateTextField control={control} name='date' label='Fecha' />
          </Stack>

          <EditToolbar
            title='Generar'
            onClick={handleSubmit(generateReport)}
            color='primary'
            hasExportButton
            exportClick={handleSubmit(exportReport)}
          />
        </Stack>
        {isLoading && <CircularProgress />}

        <ActualTable data={budgets!} />
      </form>
    </>
  )
}
