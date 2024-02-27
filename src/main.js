// file path: src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
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

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.component("NavigationBar", NavigationBar); // Register NavigationBar globally
app.mount("#app");
