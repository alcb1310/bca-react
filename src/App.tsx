import { SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

function App() {
  return (
    <>
            <h1 data-testid="page-title" className="text-3xl font-bold underline">Hello World!</h1>
            <Button data-testid="button" variant="contained" endIcon={<SettingsOutlined />} size="small">Hello World</Button>
    </>
  );
}

export default App;
