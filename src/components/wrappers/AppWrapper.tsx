import { Provider } from "react-redux"
import { store } from "../../redux/store"
import Theme from "../theme/Theme"
import { CssBaseline } from "@mui/material"

type AppWrapperProps = {
  children: React.ReactNode
}


export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        {children}
      </Theme>
    </Provider>
  )
}
