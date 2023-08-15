import SupplierDataGrid from "./datagrid/suppliers.datagrid";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import SupplierDrawer from "./drawer/suppliers.drawer";
import { useState } from "react";
import { useGetAllSuppliersQuery } from "@/api/api/bca-api-slice";
import PageTitle from "@/components/pagetitle/pagetitle.component";

export default function Suppliers() {
    const { data } = useGetAllSuppliersQuery({ jwt: "" })
    const [open, setOpen] = useState<boolean>(false)

    function handleClick() {
        setOpen(prev => !prev)
    }

    function handleClose() {
        setOpen(prev => !prev)
    }

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <PageTitle title="Proveedores" />
                <Button data-testid="supplier.create" onClick={handleClick}>Crear</Button>
            </Stack>
            {
                data ? <SupplierDataGrid suppliers={data} /> : null
            }
            <SupplierDrawer open={open} closeDrawer={handleClose} />
        </>
    )
}
