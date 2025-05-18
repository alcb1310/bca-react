import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "~redux/store";
import Theme from "~components/theme/Theme";
import AppRouter from "~components/router/Router";

const queryClient = new QueryClient();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRouter />
          </LocalizationProvider>
        </Theme>
      </QueryClientProvider>
    </Provider>
  );
}
