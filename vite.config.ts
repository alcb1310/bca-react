import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true
    }),
    react()
  ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '~components': path.resolve(__dirname, './src/components'),
            '~types': path.resolve(__dirname, './src/types'),
            '~redux': path.resolve(__dirname, './src/redux'),
        },
    },
})
