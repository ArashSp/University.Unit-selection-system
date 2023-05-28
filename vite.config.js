import vue from "@vitejs/plugin-vue";

import ssr from "vite-plugin-ssr/plugin";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue(), ssr({ prerender: true })],
  build: { target: "esnext" },
  ssr: { noExternal: ["vuetify"] },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 8081,
  },
});