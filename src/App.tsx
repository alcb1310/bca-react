import { SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function App() {
  return (
    <>
      <h1 data-testid="title" className="text-green-800 text-3xl font-bold">
        Hello world!
      </h1>
      <Button
        variant="contained"
        endIcon={<SettingsOutlined />}
        size="small"
        color="success"
        data-testid="button"
      >
        Contained
      </Button>
    </>
  );
}
