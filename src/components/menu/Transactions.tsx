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
            fontSize: 12,
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
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/presupuesto'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <PointOfSaleOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Presupuesto"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/transacciones/factura"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/factura'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <ReceiptOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Facturas"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/transacciones/cierre"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/transacciones/cierre'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AccountBalanceOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Cierre Mensual"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}
