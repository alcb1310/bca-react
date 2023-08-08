import { AssessmentOutlined, DomainOutlined, PeopleOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { MenuSection, MenuItem } from "../menusection/menusection.component";

export default function NavBar() {
    return (
        <>
            <Box mb={2}>
                <Typography component="h4" variant="h2" align="center">
                    BCA
                </Typography>
                <Typography component="p" pl={1}>
                    Bienvenido
                </Typography>
                <Divider />
            </Box>

            <MenuSection
                title="Transactions"
                icon={<DomainOutlined />}
            >
                <MenuItem
                    to="/bca/transactions/budget"
                    text="Presupuesto"
                />
                <MenuItem
                    to="/bca/transactions/invoices"
                    text="Facturas"
                />
                <MenuItem
                    to="/bca/transactions/closure"
                    text="Cierre mensual"
                />
            </MenuSection>

            <MenuSection
                title="Reportes"
                icon={<AssessmentOutlined />}
            >
                <MenuItem
                    to="/bca/reports/actual"
                    text="Presupuesto Actual"
                />
                <MenuItem
                    to="/bca/reports/balance"
                    text="Cuadre"
                />
                <MenuItem
                    to="/bca/reports/historic"
                    text="Presupuesto Histórico"
                />
                <MenuItem
                    to="/bca/reports/spend-by-item"
                    text="Gastado Por Partida"
                />
            </MenuSection>

            <MenuSection title="Parametros" icon={<SettingsOutlined />}>
                <MenuItem
                    to="/bca/settings/suppliers"
                    text="Proveedores"
                />
                <MenuItem
                    to="/bca/settings/budget-item"
                    text="Partidas"
                />
                <MenuItem
                    to="/bca/settings/projects"
                    text="Proyectos"
                />
            </MenuSection>

            <MenuSection title="Usuarios" icon={<PeopleOutlined />}>
                <MenuItem to="/bca/users/list" text="Listar" />
                <MenuItem
                    to="/bca/users/change-password"
                    text="Cambiar Contraseña"
                />
            </MenuSection>
        </>
    );
}

