import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "**/*_test.tsx",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
