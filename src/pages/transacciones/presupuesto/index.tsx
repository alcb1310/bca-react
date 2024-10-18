import { ChangeEvent, useState } from 'react'
import { CircularProgress, Grid2, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'

import EditToolbar from '../../../components/table/headers/toolbar'
import PageTitle from '../../../components/titles/PageTitle'
import AllBudgetsTable from '../../../components/parameters/budgets/AllBudgetsTable'
import { useGetAllBudgetsQuery } from '../../../redux/api/bca-backend/transacciones/budgetSlice'
import BudgetDrawer from '../../../components/drawers/Transactions/BudgetDrawer'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'

export default function Presupuesto() {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<string>('')
  const { data, isLoading } = useGetAllBudgetsQuery({ query: search, project: selectedProject })
  const { data: projects } = useGetAllProjectsQuery({ active: true })

  return (
    <Stack spacing={3}>
      <PageTitle title='Presupuesto' />

      <Grid2 container spacing={1}>
        <Grid2 size={1}>
          <EditToolbar title={'Agregar'} onClick={() => setOpen(true)} />
        </Grid2>

        <Grid2 size={2}>
          <Select
            size='small'
            className='w-full'
            value={selectedProject}
            onChange={(e: SelectChangeEvent<string>) => {
              console.log("Changing")
              setSelectedProject(e.target.value)
            }}
          >
            {
              projects?.map(project => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))
            }
          </Select>
        </Grid2>

        <Grid2 size={9}>
          <TextField
            placeholder='Buscar'
            size='small'
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className='w-full'
          />
        </Grid2>
      </Grid2>
      {isLoading && <CircularProgress />}

      <AllBudgetsTable data={data!} />
      <BudgetDrawer
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={{
          project_id: '',
          budget_item_id: '',
          quantity: 0,
          cost: 0,
          total: 0,
        }}
      />
    </Stack>
  )
}
