import { SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function App() {
  return (
    <>
      <h1 className="text-green-800 text-3xl font-bold">Hello world!</h1>
      <Button
        variant="contained"
        endIcon={<SettingsOutlined />}
        size="small"
        color="success"
      >
        Contained
      </Button>
    </>
  );
}
