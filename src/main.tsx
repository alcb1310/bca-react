import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./i18n"
const dev = import.meta.env.VITE_RUNMODE as string

async function dynImports() {
    console.log(dev)
    if (dev === 'development' || dev === 'test') {
        console.log(dev)
        const { worker } = await import('./mocks/browser')
        worker.start()
    }
}

dynImports()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
