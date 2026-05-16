/// <reference types="vite/client" />
import type { QueryClient } from '@tanstack/react-query'
import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()(
    {
        head: () => ({
            meta: [
                {
                    charSet: 'utf-8',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    title: 'BCA',
                },
            ],
            links: [{ rel: 'stylesheet', href: appCss }],
        }),
        component: RootComponent,
    },
)

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en'>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}
