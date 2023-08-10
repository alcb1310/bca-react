import { AssessmentOutlined, DomainOutlined, PeopleOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { MenuSection, MenuItem } from "../menusection/menusection.component";
import { useTranslation } from "react-i18next";

export default function NavBar() {
    const { t } = useTranslation()

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
                title={t('menu.transactions.title')}
                icon={<DomainOutlined />}
            >
                <MenuItem
                    to="/bca/transactions/budget"
                    text={t('menu.transactions.budget')}
                />
                <MenuItem
                    to="/bca/transactions/invoices"
                    text={t('menu.transactions.invoices')}
                />
                <MenuItem
                    to="/bca/transactions/closure"
                    text={t('menu.transactions.closure')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.reports.title')}
                icon={<AssessmentOutlined />}
            >
                <MenuItem
                    to="/bca/reports/actual"
                    text={t('menu.reports.actual')}
                />
                <MenuItem
                    to="/bca/reports/balance"
                    text={t('menu.reports.balance')}
                />
                <MenuItem
                    to="/bca/reports/historic"
                    text={t('menu.reports.historic')}
                />
                <MenuItem
                    to="/bca/reports/spend-by-item"
                    text={t('menu.reports.spent')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.settings.title')}
                icon={<SettingsOutlined />}
            >
                <MenuItem
                    to="/bca/settings/suppliers"
                    text={t('menu.settings.suppliers')}
                />
                <MenuItem
                    to="/bca/settings/budget-item"
                    text={t('menu.settings.budgetItems')}
                />
                <MenuItem
                    to="/bca/settings/projects"
                    text={t('menu.settings.projects')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.users.title')}
                icon={<PeopleOutlined />}
            >
                <MenuItem to="/bca/users/list" text={t('menu.users.list')} />
                <MenuItem
                    to="/bca/users/change-password"
                    text={t('menu.users.change')}
                />
            </MenuSection>
        </>
    );
}

