import { ReactNode, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Link, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

type MenuSectionProps = {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    "data-testid"?: string
};

type MenuItemProps = {
    text: string;
    to: string;
    "data-testid"?: string
};

export function MenuSection({ title, children, icon, "data-testid": testid }: MenuSectionProps) {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen((prev) => !prev);
    }

    return (
        <Box mb={1}>
            <ListItemButton onClick={handleClick} >
                {icon ?? <ListItemIcon>{icon}</ListItemIcon>}
                &nbsp;
                <ListItemText data-testid={testid}>{title}</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                <Stack spacing={1} direction="column" ml={6}>
                    {children}
                </Stack>
            </Collapse>
        </Box>
    );
}

export function MenuItem({ text, to, "data-testid": testid }: MenuItemProps) {
    return (
        <Box>
            <Link href={to} underline="none" data-testid={testid}>
                {text}
            </Link>
        </Box>
    );
}

