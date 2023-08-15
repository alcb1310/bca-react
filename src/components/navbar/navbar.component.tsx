import { AssessmentOutlined, DomainOutlined, PeopleOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MenuItem, MenuSection } from "../menusection/menusection.component";

export default function NavBar() {
    const { t } = useTranslation()

    return (
        <>
            <Box mb={2}>
                <Typography component="h4" variant="h2" align="center">
                    BCA
                </Typography>
                <Divider />
            </Box>

            <MenuSection
                title={t('menu.transactions.title')}
                icon={<DomainOutlined />}
                data-testid="menu.transactions"
            >
                <MenuItem
                    to="/transactions/budget"
                    text={t('menu.transactions.budget')}
                    data-testid="menu.transactions.budget"
                />
                <MenuItem
                    to="/transactions/invoices"
                    text={t('menu.transactions.invoices')}
                    data-testid="menu.transactions.invoices"
                />
                <MenuItem
                    to="/transactions/closure"
                    text={t('menu.transactions.closure')}
                    data-testid="menu.transactions.closure"
                />
            </MenuSection>

            <MenuSection
                title={t('menu.reports.title')}
                icon={<AssessmentOutlined />}
                data-testid="menu.reports"
            >
                <MenuItem
                    to="/reports/actual"
                    text={t('menu.reports.actual')}
                    data-testid="menu.reports.actual"
                />
                <MenuItem
                    to="/reports/balance"
                    text={t('menu.reports.balance')}
                    data-testid="menu.reports.balance"
                />
                <MenuItem
                    to="/reports/historic"
                    text={t('menu.reports.historic')}
                    data-testid="menu.reports.historic"
                />
                <MenuItem
                    to="/reports/spend-by-item"
                    text={t('menu.reports.spent')}
                    data-testid="menu.reports.spent"
                />
            </MenuSection>

            <MenuSection
                title={t('menu.settings.title')}
                icon={<SettingsOutlined />}
                data-testid="menu.settings"
            >
                <MenuItem
                    to="/settings/suppliers"
                    text={t('menu.settings.suppliers')}
                    data-testid="menu.settings.suppliers"
                />
                <MenuItem
                    to="/settings/budget-items"
                    text={t('menu.settings.budgetItems')}
                    data-testid="menu.settings.budgetItems"
                />
                <MenuItem
                    to="/settings/projects"
                    text={t('menu.settings.projects')}
                    data-testid="menu.settings.projects"
                />
            </MenuSection>

            <MenuSection
                title={t('menu.users.title')}
                icon={<PeopleOutlined />}
                data-testid="menu.users"
            >
                <MenuItem
                    to="/users/list"
                    data-testid="menu.users.list"
                    text={t('menu.users.list')} />
                <MenuItem
                    to="/users/change-password"
                    text={t('menu.users.change')}
                    data-testid="menu.users.change"
                />
            </MenuSection>
        </>
    );
}

