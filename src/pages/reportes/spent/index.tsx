import { useForm } from 'react-hook-form'
import PageTitle from '../../../components/titles/PageTitle'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import {
  useGetAllLevelsQuery,
  useGetSpentQuery,
} from '../../../redux/api/bca-backend/reports/commonSlice'
import BcaSelect from '../../../components/input/BcaSelect'
import { CircularProgress, Stack } from '@mui/material'
import BcaDateTextField from '../../../components/input/BcaDateTextField'
import EditToolbar from '../../../components/table/headers/toolbar'
import { z } from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import SpentTable from '../../../components/reports/SpentTable'

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
  const { data, isLoading } = useGetSpentQuery(selectedReport!)

  function generateReport(info: ReportTypes) {
    // console.log(info)
    // console.log(typeof info.date)
    let day = `${info.date.getDate()}`
    if (day.length === 1) {
      day = `0${day}`
    }

    const date = `${info.date.getFullYear()}-${info.date.getMonth() + 1}-${day}`

    const reportData = {
      project_id: info.project_id,
      level: info.level,
      date,
    }
    setSelectedReport(reportData)
  }

  return (
    <>
      <PageTitle title='Gastado por partida' />

      <form onSubmit={handleSubmit(generateReport)}>
        <Stack width='50%' direction={'column'} spacing={2} mx={'auto'} mt={2}>
          <BcaSelect name='project_id' label='Proyecto' control={control}>
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>

          <Stack direction={'row'} justifyContent={'space-between'}>
            <BcaSelect name='level' label='Nivel' control={control}>
              <option value=''>Seleccione un nivel</option>
              {levels?.map((level) => (
                <option key={level.key} value={level.key}>
                  {level.value}{' '}
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
            exportClick={() => {}}
          />
        </Stack>
      </form>
      {isLoading && <CircularProgress />}
      <SpentTable data={data!} />
    </>
  )
}
