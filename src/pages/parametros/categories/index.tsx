import CategoriesDrawer from '@/components/drawers/Settings/Categories/CategoriesDrawer'
import AllCategoriesTable from '@/components/settings/categories/AllCategoriesTable'
import EditToolbar from '@/components/table/headers/toolbar'
import PageTitle from '@/components/titles/PageTitle'
import { GetAllCategories } from '@/queries/parametros/categories'
import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Categories() {
    const [open, setOpen] = useState<boolean>(false)
    const { data, isLoading } = useQuery({
        queryKey: ['categorias'],
        queryFn: () => GetAllCategories(),
    })

    function handleClick() {
        setOpen((prev) => !prev)
    }

    return (
        <>
            <PageTitle title='Categorias' />

            {isLoading && (
                <CircularProgress data-testid='page.parametros.categorias.loading' />
            )}
            <EditToolbar title='Crear Categoria' onClick={handleClick} />
            <AllCategoriesTable data={data!} />
            <CategoriesDrawer
                open={open}
                onClose={handleClick}
                defaultValues={{
                    name: '',
                }}
            />
        </>
    )
}
