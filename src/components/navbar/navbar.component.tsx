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
                <Divider />
            </Box>

            <MenuSection
                title={t('menu.transactions.title')}
                icon={<DomainOutlined />}
            >
                <MenuItem
                    to="/transactions/budget"
                    text={t('menu.transactions.budget')}
                />
                <MenuItem
                    to="/transactions/invoices"
                    text={t('menu.transactions.invoices')}
                />
                <MenuItem
                    to="/transactions/closure"
                    text={t('menu.transactions.closure')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.reports.title')}
                icon={<AssessmentOutlined />}
            >
                <MenuItem
                    to="/reports/actual"
                    text={t('menu.reports.actual')}
                />
                <MenuItem
                    to="/reports/balance"
                    text={t('menu.reports.balance')}
                />
                <MenuItem
                    to="/reports/historic"
                    text={t('menu.reports.historic')}
                />
                <MenuItem
                    to="/reports/spend-by-item"
                    text={t('menu.reports.spent')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.settings.title')}
                icon={<SettingsOutlined />}
            >
                <MenuItem
                    to="/settings/suppliers"
                    text={t('menu.settings.suppliers')}
                />
                <MenuItem
                    to="/settings/budget-items"
                    text={t('menu.settings.budgetItems')}
                />
                <MenuItem
                    to="/settings/projects"
                    text={t('menu.settings.projects')}
                />
            </MenuSection>

            <MenuSection
                title={t('menu.users.title')}
                icon={<PeopleOutlined />}
            >
                <MenuItem to="/users/list" text={t('menu.users.list')} />
                <MenuItem
                    to="/users/change-password"
                    text={t('menu.users.change')}
                />
            </MenuSection>
        </>
    );
}

