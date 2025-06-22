import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
