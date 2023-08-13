import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const { t } = useTranslation()

    return <Typography data-testid="landing.title">{t('pages.landing.title')}</Typography>
}
