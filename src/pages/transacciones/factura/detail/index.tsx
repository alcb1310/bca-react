import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export default function IndividualInvoice() {
  const { invoiceId } = useParams()

  return (
    <>
      <Typography variant="h5" component="h5" textTransform="uppercase" sx={{ textAlign: 'center' }}>
        Factura {invoiceId}
      </Typography>
    </>
  )
}
