import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'
import { testStore } from '../../redux/testStore'

type TestAppWrapperProps = {
    children: ReactNode
}

export default function TestAppWrapper({ children }: TestAppWrapperProps) {
    return (
        <Provider store={testStore}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
}
