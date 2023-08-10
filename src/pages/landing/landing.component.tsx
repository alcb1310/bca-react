import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const { t } = useTranslation()

    return <Typography>{t('pages.landing.title')}</Typography>
}
