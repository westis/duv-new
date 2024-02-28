// vite.config.ts
import { defineConfig } from "vite";
import VueRouter from "unplugin-vue-router/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify from "vite-plugin-vuetify";
import path from "path";
import dotenv from "dotenv";

// Load correct env file based on mode
dotenv.config({ path: `.env.${process.env.MODE}` });

export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    Vue(),
    Vuetify({ autoImport: true }),
  ],
  base: process.env.VITE_BASE_URL,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias '@' to '/src'
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
