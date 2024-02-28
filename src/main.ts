// file path: src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import store from "./store";
import NavigationBar from "./components/NavigationBar.vue"; // Import NavigationBar
import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark", // Set the default starting theme
    themes: {
      light: {
        // Your light theme colors
        colors: {
          primary: "#FEA541",
          secondary: "#5CBBF6",
          // ... other light theme colors
        },
      },
      dark: {
        // Your dark theme colors
        colors: {
          primary: "#FEA541",
          secondary: "#B0BEC5",
          // ... other dark theme colors
        },
      },
    },
  },
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // the routes property is handled by the plugin
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.mount("#app");
