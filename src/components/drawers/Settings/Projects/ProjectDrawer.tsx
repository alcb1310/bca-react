import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormControlLabel } from '@mui/material'
import { RhfSwitch } from 'mui-rhf-integration'
import { zodResolver } from '@hookform/resolvers/zod'

import DrawerTitle from '../../../titles/DrawerTitle'
import BcaDrawer from '../../BcaDrawer/BcaDrawer'
import { projectSchema, ProjectType } from '../../../../types/project'
import BcaTextField from '../../../input/BcaTextField'
import ButtonGroup from '../../../buttons/button-group'
import { useCreateProjectMutation } from '../../../../redux/api/bca-backend/parametros/projectsSlice'

type ProjectDrawerProps = {
  open: boolean
  onClose: () => void
  defaultValues: ProjectType
}

export default function ProjectDrawer({
  open,
  onClose,
  defaultValues,
}: ProjectDrawerProps) {
  const { control, reset, handleSubmit } = useForm<ProjectType>({
    defaultValues,
    resolver: zodResolver(projectSchema),
  })

  const [createProject] = useCreateProjectMutation()

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function hadleSubmit(data: ProjectType) {
    data.gross_area = parseFloat(data.gross_area?.toString() || '0')
    data.net_area = parseFloat(data.net_area?.toString() || '0')

    if (!defaultValues.id) {
      const res = await createProject(data)
      if ('data' in res) {
        onClose()
        return
      }
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title='Proyectos' close={onClose} />

      <form
        className='mt-5 flex flex-col gap-5'
        onSubmit={handleSubmit(hadleSubmit)}
      >
        <BcaTextField name='name' label='Nombre' control={control} />
        <BcaTextField name='net_area' label='Area Bruta' control={control} />
        <BcaTextField name='gross_area' label='Area Util' control={control} />

        <FormControlLabel
          name='is_active'
          labelPlacement='end'
          label='Activo'
          control={
            <RhfSwitch name='is_active' control={control} size='small' />
          }
        />

        <ButtonGroup
          saveFunction={handleSubmit(hadleSubmit)}
          cancelFunction={onClose}
        />
      </form>
    </BcaDrawer>
  )
}
