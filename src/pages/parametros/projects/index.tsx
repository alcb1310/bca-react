import { useState } from 'react'
import { CircularProgress, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

import EditToolbar from '../../../components/table/headers/toolbar'
import PageTitle from '../../../components/titles/PageTitle'
import AllProjectsTable from '../../../components/settings/projects/AllProjectsTable'
import { useGetAllProjectsQuery } from '../../../redux/api/bca-backend/parametros/projectsSlice'
import ProjectDrawer from '../../../components/drawers/Settings/Projects/ProjectDrawer'

export default function Projects() {
    const [open, setOpen] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const { data, isLoading } = useGetAllProjectsQuery({ query })

    return (
        <>
            <PageTitle title='Proyectos' />

            {isLoading && (
                <CircularProgress data-testid='page.parameters.projects.loading' />
            )}

            <Grid container spacing={2}>
                <Grid size={2}>
                    <EditToolbar title='Crear Proyecto' onClick={() => setOpen(true)} />
                </Grid>

                <Grid size={10}>
                    <TextField
                        label='Buscar'
                        data-testid='page.parameters.projects.search'
                        name='query'
                        size='small'
                        className='w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Grid>
            </Grid>

            <AllProjectsTable data={data!} />
            <ProjectDrawer
                open={open}
                onClose={() => setOpen(false)}
                defaultValues={{
                    name: '',
                    is_active: false,
                }}
            />
        </>
    )
}
