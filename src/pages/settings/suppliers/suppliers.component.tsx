import { Typography } from "@mui/material";
import { useGetAllSuppliersQuery } from "../../../api/api/bca-api-slice";
import SupplierDataGrid from "./datagrid/suppliers.datagrid";

export default function Suppliers() {
    const { data } = useGetAllSuppliersQuery({ jwt: "" })

    return (
        <>
            <Typography data-testid="page.title">Proveedores</Typography>
            {
                data ? <SupplierDataGrid suppliers={data} /> : null
            }
        </>
    )
}
