<template>
  <v-app :theme="themeStore.currentTheme" class="app-container">
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
</template>

<script setup>
import { useThemeStore } from "@/stores/ThemeStore";
const themeStore = useThemeStore();
</script>
