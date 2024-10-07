import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AddchartOutlined, BalanceOutlined, ChevronRightOutlined, ExpandMoreOutlined, LocalAtmOutlined, WorkHistoryOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function ReportsMenu() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Box>
      <ListItemButton onClick={() => setOpen(prev => !prev)}>
        <ListItemText
          primary="Reportes"
          primaryTypographyProps={{
            fontWeight: 'bold',
            fontSize: 8,
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
          >
            <ListItemIcon>
              <AddchartOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Actual"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 8,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/cuadre"
            sx={{ mb: 1, borderRadius: 2 }}
          >
            <ListItemIcon>
              <BalanceOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Cuadre"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 8,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/gastado-por-partida"
            sx={{ mb: 1, borderRadius: 2 }}
          >
            <ListItemIcon>
              <LocalAtmOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Gastado por Partida"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 8,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/reportes/historico"
            sx={{ mb: 1, borderRadius: 2 }}
          >
            <ListItemIcon>
              <WorkHistoryOutlined sx={{ fontSize: 12 }} />
            </ListItemIcon>

            <ListItemText
              primary="Historico"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: 8,
                textTransform: 'uppercase'
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}
