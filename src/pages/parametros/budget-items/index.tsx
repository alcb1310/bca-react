import { useState } from 'react'
import PageTitle from '../../../components/titles/PageTitle'
import { useGetAllBudgetItemsQuery } from '../../../redux/api/bca-backend/parametros/budgetItemSlice'
import { CircularProgress, TextField } from '@mui/material'
import EditToolbar from '../../../components/table/headers/toolbar'
import Grid from '@mui/material/Grid2'
import AllBudgetItemsTable from '../../../components/settings/budget-items/AllBudgetItemsTable'
import { BudgetItem } from '../../../types/partidas'
import BudgetItemDrawer from '../../../components/drawers/Settings/BudgetItems/BudgetItemDrawer'

export default function BudgetItems() {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const { data, isLoading } = useGetAllBudgetItemsQuery({ query })

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <PageTitle title='Partidas' />
      {isLoading && <CircularProgress />}
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditToolbar title='Crear Partida' onClick={handleClick} />
        </Grid>

        <Grid size={10}>
          <TextField
            label='Buscar'
            name='query'
            value={query}
            size='small'
            onChange={(e) => setQuery(e.target.value)}
            className='w-full'
          />
        </Grid>
      </Grid>

      <AllBudgetItemsTable allBudgetItems={data as BudgetItem[]} />

      <BudgetItemDrawer
        open={open}
        onClose={handleClick}
        defaultValues={{
          id: '',
          code: '',
          name: '',
          accumulate: false,
          parent_id: '',
        }}
      />
    </>
  )
}
