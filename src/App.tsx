import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './router/routes'
import AppWrapper from './wrappers/AppWrapper'

const router = createBrowserRouter(routes)

function App() {
    return (
        <AppWrapper>
            <RouterProvider router={router} />
        </AppWrapper>
    )
}

export default App
