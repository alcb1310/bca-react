import { ReactNode, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Link, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

type MenuSectionProps = {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
};

type MenuItemProps = {
    text: string;
    to: string;
};

export function MenuSection({ title, children, icon }: MenuSectionProps) {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen((prev) => !prev);
    }

    return (
        <Box mb={1}>
            <ListItemButton onClick={handleClick}>
                {icon ?? <ListItemIcon>{icon}</ListItemIcon>}
                &nbsp;
                <ListItemText>{title}</ListItemText>
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

export function MenuItem({ text, to }: MenuItemProps) {
    return (
        <Box>
            <Link href={to} underline="none">
                {text}
            </Link>
        </Box>
    );
}

