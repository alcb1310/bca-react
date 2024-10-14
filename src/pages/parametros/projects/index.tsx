import { CircularProgress, TextField } from "@mui/material"
import EditToolbar from "../../../components/table/headers/toolbar"
import PageTitle from "../../../components/titles/PageTitle"
import Grid from '@mui/material/Grid2'
import AllProjectsTable from "../../../components/settings/projects/AllProjectsTable"
import { useGetAllProjectsQuery } from "../../../redux/api/bca-backend/parametros/projectsSlice"

export default function Projects() {
  const { data, isLoading } = useGetAllProjectsQuery()

  return (
    <>
      <PageTitle title="Proyectos" />

      {isLoading && <CircularProgress />}

      <Grid container spacing={2}>
        <Grid size={2}>
          <EditToolbar title="Crear Proyecto" onClick={() => { }} />
        </Grid>

        <Grid size={10}>
          <TextField
            label="Buscar"
            name="query"
            size="small"
            className="w-full"
          />
        </Grid>
      </Grid>

      <AllProjectsTable data={data!} />
    </>
  )
}
