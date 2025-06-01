import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper, { type router } from './components/wrappers/AppWrapper.tsx'

import './index.css'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
