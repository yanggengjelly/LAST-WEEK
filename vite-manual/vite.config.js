import { defineConfig } from "vite";
import { resolve } from "node:path";

const viteConfig = defineConfig({
  build: {
    outDir: "docs",
  },
  server: {
    host: "localhost",
    port: 3000,
    cors: true,
  },
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:2]",
    },
  },
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
});

export default viteConfig;
