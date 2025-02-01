import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { testStore } from '../../redux/testStore'
import { MemoryRouter } from 'react-router-dom'

type TestRouterWraperProps = {
    route: string[]
    children: ReactNode
}

export default function TestRouterWraper({
    route,
    children,
}: TestRouterWraperProps) {
    return (
        <Provider store={testStore}>
            <MemoryRouter initialEntries={route}>{children}</MemoryRouter>
        </Provider>
    )
}
