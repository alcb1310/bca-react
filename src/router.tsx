import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { NotFound } from './components/NotFound'
import { routeTree } from './routeTree.gen'

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
