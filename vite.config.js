// vite.config.ts
import { defineConfig } from "vite";
import VueRouter from "unplugin-vue-router/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    Vue(),
    Vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias '@' to '/src'
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
