import { defineConfig } from 'cypress'

export default defineConfig({
    projectId: 'a11s7i',
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})
