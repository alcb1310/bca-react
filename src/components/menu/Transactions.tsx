import {
  AccountBalanceOutlined,
  ChevronRightOutlined,
  ExpandMoreOutlined,
  PointOfSaleOutlined,
  ReceiptOutlined
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function TransactionsMenu() {
  const [open, setOpen] = useState<boolean>(true)
  const str = useLocation().pathname

  return (
    <Box>
      <ListItemButton onClick={() => setOpen(prev => !prev)} >
        <ListItemText
          primary="Transacciones"
          primaryTypographyProps={{
            fontWeight: 'bold',
            fontSize: "0.85rem",
            lineHeight: "1rem",
            textTransform: 'uppercase'
          }}
        />
        {open ? <ExpandMoreOutlined /> : <ChevronRightOutlined />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItemButton
            component={NavLink}
            to="/transacciones/presupuesto"
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/presupuesto'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <PointOfSaleOutlined sx={{ fontSize: "0.75rem" }} />
            </ListItemIcon>

            <ListItemText
              primary="Presupuesto"
              primaryTypographyProps={{
                fontSize: "0.75rem",
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/transacciones/factura"
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/factura'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <ReceiptOutlined sx={{ fontSize: "0.75rem" }} />
            </ListItemIcon>

            <ListItemText
              primary="Facturas"
              primaryTypographyProps={{
                fontSize: "0.75rem",
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/transacciones/cierre"
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/cierre'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AccountBalanceOutlined sx={{ fontSize: "0.75rem" }} />
            </ListItemIcon>

            <ListItemText
              primary="Cierre Mensual"
              primaryTypographyProps={{
                fontSize: "0.75rem",
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}
