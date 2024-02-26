import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
    // Add theme configuration
    defaultTheme: "dark", // Set the default starting theme
    themes: {
      light: {
        // Your light theme colors
        colors: {
          primary: "#1867C0",
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

createApp(App).use(store).use(router).use(vuetify).mount("#app");
