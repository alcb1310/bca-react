import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { NotFound } from './components/NotFound'

export function getRouter() {
    const queryClient = new QueryClient()

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultPreload: 'intent',
        defaultNotFoundComponent: NotFound,
        context: { queryClient },
    })

    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    })


    return router
}
