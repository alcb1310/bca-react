import { useForm } from 'react-hook-form'
import PageTitle from '../../../components/titles/PageTitle'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import { useGetAllLevelsQuery } from '../../../redux/api/bca-backend/reports/commonSlice'
// import { SpentRequest } from '../../../types/reports'
import BcaSelect from '../../../components/input/BcaSelect'
import { Stack } from '@mui/material'
import BcaDateTextField from '../../../components/input/BcaDateTextField'
import EditToolbar from '../../../components/table/headers/toolbar'

export default function Spent() {
  const { control } = useForm()
  const { data: projects } = useGetAllProjectsQuery({})
  const { data: levels } = useGetAllLevelsQuery()

  return (
    <>
      <PageTitle title='Gastado por partida' />

      <form>
        <Stack width='50%' direction={'column'} spacing={2} mx={'auto'} mt={2}>
          <BcaSelect name='project' label='Proyecto' control={control}>
            <option value=''>Seleccionar</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </BcaSelect>

          <Stack direction={'row'} justifyContent={'space-between'}>
            <BcaSelect name='level' label='Nivel' control={control}>
              <option value=''>Seleccionar</option>
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
            onClick={() => {}}
            color='primary'
            hasExportButton
            exportClick={() => {}}
          />
        </Stack>
      </form>
    </>
  )
}
