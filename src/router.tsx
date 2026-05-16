import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { NotFound } from './components/NotFound'

export function getRouter() {
    const queryClient = new QueryClient()

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        context: { queryClient },
        defaultPreload: 'intent',
        defaultNotFoundComponent: NotFound,
    })

    return router
}
