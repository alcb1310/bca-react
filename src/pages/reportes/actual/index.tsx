import { z } from 'zod'
import PageTitle from '../../../components/titles/PageTitle'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BcaSelect from '../../../components/input/BcaSelect'
import { Button, CircularProgress, Stack } from '@mui/material'
import { AddOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import { useGetAllBudgetsByProjectAndLevelQuery } from '../../../redux/api/bca-backend/transacciones/budgetSlice'
import { useState } from 'react'
import { useGetAllLevelsQuery } from '../../../redux/api/bca-backend/reports/common'
import ActualTable from '../../../components/reports/ActualTable'
import { useAppSelector } from '../../../redux/hooks'

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
  const { control, handleSubmit } = useForm<ReportTypes>({
    resolver: zodResolver(reportSchema),
  })
  const { data: projects } = useGetAllProjectsQuery({ active: true })
  const { data: levels } = useGetAllLevelsQuery()
  const [selectedReport, setSelectedReport] = useState<ReportTypes>({
    project_id: '',
    level: '',
  })
  const { data, isLoading } =
    useGetAllBudgetsByProjectAndLevelQuery(selectedReport)

  const token = useAppSelector((state) => state.login.token)

  function hadleSubmit(data: ReportTypes) {
    console.log('submit', data)
    setSelectedReport(data)
  }

  const downloadExcelFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)
    // const url = `http://localhost:42069:/public/${fileName}`
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    console.dir(a)
    URL.revokeObjectURL(url)
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
      <PageTitle title='Actual' />
      <form onSubmit={handleSubmit(hadleSubmit)}>
        <Stack width='50%' direction='column' spacing={2} mx='auto' mt={2}>
          <BcaSelect name='project_id' label='Proyecto' control={control}>
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>
          <BcaSelect name='level' label='Nivel' control={control}>
            <option value=''>Seleccione un nivel</option>
            {levels?.map((level) => (
              <option key={level.key} value={level.key}>
                {level.value}
              </option>
            ))}
          </BcaSelect>

          <Stack direction='row' spacing={2} justifyContent='flex-start'>
            <Button
              variant='text'
              startIcon={<AddOutlined />}
              color='primary'
              onClick={handleSubmit(hadleSubmit)}
              size='small'
            >
              Generar
            </Button>
            <Button
              variant='text'
              startIcon={<FileDownloadOutlined />}
              onClick={handleSubmit(exportClick)}
              size='small'
              color='success'
            >
              Exportar
            </Button>
          </Stack>
        </Stack>
      </form>
      {isLoading && <CircularProgress />}

      <ActualTable data={data!} />
    </>
  )
}
