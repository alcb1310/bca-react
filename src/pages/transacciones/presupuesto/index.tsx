import {
  CircularProgress,
  Grid2,
  NativeSelect,
  Stack,
  TextField,
} from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type ChangeEvent, useState } from 'react'
import BudgetDrawer from '~/components/drawers/Transactions/BudgetDrawer/BudgetDrawer'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useGetAllProjectsQuery } from '~/queries/parametros/proyectos'
import { useGetAllBudgetsQuery } from '~/queries/transacciones/presupuesto'
import AllBudgetsTable from '~components/parameters/budgets/AllBudgetsTable'
import EditToolbar from '~components/table/headers/toolbar'

export default function Presupuesto() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<string>('')

  const { data, isFetching } = useQuery({
    queryKey: ['budget', search, selectedProject],
    queryFn: () =>
      useGetAllBudgetsQuery({ query: search, project: selectedProject }),
  })
  const { data: projects } = useQuery({
    queryKey: ['projects', 'active'],
    queryFn: () => useGetAllProjectsQuery({ active: true }),
  })

  return (
    <Stack spacing={3}>
      <PageTitle title='Presupuesto' />

      <Grid2 container spacing={1}>
        <Grid2 size={1}>
          <EditToolbar
            title={'Agregar Presupuesto'}
            onClick={() => setOpen(true)}
          />
        </Grid2>

        <Grid2 size={2}>
          <NativeSelect
            size='small'
            data-testid='page.transactions.budget.filter.project'
            variant='outlined'
            className='w-full'
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value)
              queryClient.invalidateQueries({
                queryKey: ['budget', search, selectedProject],
              })
            }}
          >
            <option value=''>Seleccione un proyecto</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </NativeSelect>
        </Grid2>

        <Grid2 size={9}>
          <TextField
            label='Buscar'
            data-testid='page.transactions.budget.filter.search'
            size='small'
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className='w-full'
          />
        </Grid2>
      </Grid2>
      {isFetching && (
        <CircularProgress data-testid='page.transactions.budget.loading' />
      )}
      <AllBudgetsTable data={data} />
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
