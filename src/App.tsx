import { SettingsOutlined } from "@mui/icons-material";
import { Button, CssBaseline } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "./query/home";

export default function App() {
    const { isPending, error, data } = useQuery({
        queryKey: ["home"],
        queryFn: getHomePage,
    });

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <CssBaseline />
            <h1 data-testid="title" className="text-green-800 text-3xl font-bold">
                Hello world!
            </h1>
            <Button
                variant="contained"
                endIcon={<SettingsOutlined />}
                size="small"
                color="primary"
                data-testid="button"
            >
                Contained
            </Button>
            <p data-testid="message">{data.message}</p>
        </>
    );
}
