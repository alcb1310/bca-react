import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AddchartOutlined, BalanceOutlined, ChevronRightOutlined, ExpandMoreOutlined, LocalAtmOutlined, WorkHistoryOutlined } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

export default function ReportsMenu() {
  const [open, setOpen] = useState<boolean>(true)
  const str = useLocation().pathname

  return (
    <Box>
      <ListItemButton onClick={() => setOpen(prev => !prev)}>
        <ListItemText
          primary="Reportes"
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
            to="/reportes/actual"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/reportes/actual'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AddchartOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Actual"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/cuadre"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/reportes/cuadre'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <BalanceOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Cuadre"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/gastado-por-partida"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/reportes/gastado-por-partida'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <LocalAtmOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Gastado por Partida"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/historico"
            sx={{ mb: 1, borderRadius: 2 }}
            selected={str.toLowerCase() === '/reportes/historico'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <WorkHistoryOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Historico"
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
