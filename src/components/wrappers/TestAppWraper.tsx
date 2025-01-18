import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'

type TestAppWrapperProps = {
    children: ReactNode
}

export default function TestAppWrapper({ children }: TestAppWrapperProps) {
    return (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
}
