import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@shared": fileURLToPath(new URL("../../packages/shared", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },

  build: {
    sourcemap: true,
  },
});
