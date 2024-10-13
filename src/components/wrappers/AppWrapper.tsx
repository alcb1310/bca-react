import { Provider } from "react-redux"
import { store } from "../../redux/store"
import Theme from "../theme/Theme"
import { CssBaseline } from "@mui/material"
import AppRouter from "../router/Router"

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <AppRouter />
      </Theme>
    </Provider>
  )
}
