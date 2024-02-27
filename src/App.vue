<template>
  <v-theme-provider :theme="theme">
    <v-app :class="['app-container', theme]">
      <NavigationBar />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <v-footer color="primary" app>
        <span>&copy; 2024 DUV</span>
      </v-footer>
    </v-app>
  </v-theme-provider>
</template>

<script setup>
import { ref, provide } from "vue";
import NavigationBar from "./components/NavigationBar.vue";

const theme = ref("light");
provide("theme", theme);
</script>
