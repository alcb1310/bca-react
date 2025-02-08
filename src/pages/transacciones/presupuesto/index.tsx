import { ChangeEvent, useState } from 'react'
import {
    CircularProgress,
    Grid2,
    NativeSelect,
    Stack,
    TextField,
} from '@mui/material'

import EditToolbar from '~components/table/headers/toolbar'
import PageTitle from '~components/titles/PageTitle'
import AllBudgetsTable from '~components/parameters/budgets/AllBudgetsTable'
import { useGetAllBudgetsQuery } from '~redux/api/bca-backend/transacciones/budgetSlice'
import BudgetDrawer from '~components/drawers/Transactions/BudgetDrawer'
import { useGetAllProjectsQuery } from '~redux/api/bca-backend/parametros/projectsSlice'

export default function Presupuesto() {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<string>('')
    const { data, isLoading } = useGetAllBudgetsQuery({
        query: search,
        project: selectedProject,
    })
    const { data: projects } = useGetAllProjectsQuery({ active: true })

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
                        onChange={(e) => setSelectedProject(e.target.value)}
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
            {isLoading && (
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
