import { useForm } from 'react-hook-form'
import PageTitle from '../../../components/titles/PageTitle'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, Stack } from '@mui/material'
import BcaDateTextField from '../../../components/input/BcaDateTextField'
import BcaSelect from '../../../components/input/BcaSelect'
import EditToolbar from '../../../components/table/headers/toolbar'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import BalanceTable from '../../../components/reports/BalanceTable'
import { useState } from 'react'
import { useGetBalanceReportQuery } from '../../../redux/api/bca-backend/reports/commonSlice'
import { useAppSelector } from '../../../redux/hooks'
import { downloadExcelFile } from '../../../utils/download'

const reportSchema = z.object({
  project_id: z
    .string({ message: 'Seleccione un proyecto' })
    .uuid('Seleccione un proyecto'),
  date: z.coerce.date({ message: 'Seleccione una fecha' }),
})

type ReportType = z.infer<typeof reportSchema>

export default function Balance() {
  const { control, handleSubmit } = useForm<ReportType>({
    defaultValues: {
      project_id: '',
      date: new Date(),
    },
    resolver: zodResolver(reportSchema),
  })

  const [selectedData, setSelectedData] = useState({
    project_id: '',
    date: '',
  })
  const { data: projects } = useGetAllProjectsQuery({ active: true })
  const { data, isLoading } = useGetBalanceReportQuery(selectedData!)
  const token = useAppSelector(state => state.login.token)

  function generateReport(data: ReportType) {
    const selectedDate = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`

    setSelectedData({
      project_id: data.project_id,
      date: selectedDate,
    })
  }

  return (
    <>
      <PageTitle title='Cuadre' />

      <form>
        <Stack width='50%' direction='column' spacing={2} mx='auto' mt={2}>
          <BcaSelect name='project_id' label='Proyecto' control={control}>
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>
          <Stack direction='row' spacing={2}>
            <BcaDateTextField name='date' label='Fecha' control={control} />
          </Stack>

          <EditToolbar
            title='Generar'
            onClick={handleSubmit(generateReport)}
            hasExportButton
            exportClick={() => { }}
          />
        </Stack>
      </form>
      {isLoading && <CircularProgress />}
      <BalanceTable data={data!} />
    </>
  )
}
