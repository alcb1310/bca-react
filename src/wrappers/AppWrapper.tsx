import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

type AppWrapperProps = {
    children: ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
