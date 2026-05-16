import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        port: 5173,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tailwindcss(),
        tanstackStart(),
        nitro(),
        // react's vite plugin must come after start's vite plugin
        viteReact(),
    ],
})
