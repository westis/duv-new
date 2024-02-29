// vite.config.js
import { defineConfig } from "vite";
import VueRouter from "unplugin-vue-router/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify from "vite-plugin-vuetify";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import dotenv from "dotenv";

// Load correct env file based on mode
dotenv.config({ path: `.env.${process.env.MODE}` });

export default defineConfig({
  plugins: [
    VueRouter({
      // Your VueRouter options
    }),
    Vue(),
    Vuetify({
      autoImport: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"], // Specify other imports as needed
      dts: "src/auto-imports.d.ts", // Generates a .d.ts file with type declarations
    }),
    Components({
      resolvers: [
        VuetifyResolver(), // Automatically import Vuetify components
      ],
      dts: "src/components.d.ts", // Generates a .d.ts file for auto-imported components
    }),
  ],
  base: process.env.VITE_BASE_URL,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Keep the existing alias
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // Keep the existing extensions
  },
});
