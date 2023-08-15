import { ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import Loading from '@/components/loading/loading.component'
import { store } from '@/store/store'

type AppWrapperProps = {
    children: ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
    return (
        <Suspense fallback={<Loading />}>
            <CookiesProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </CookiesProvider>
        </Suspense>
    )
}
