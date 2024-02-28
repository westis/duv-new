// src/components/NavigationBar.vue
<template>
  <v-app-bar app dense>
    <!-- Hamburger menu icon -->
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Logo with text for wider screens, symbol only for narrower screens -->
    <v-toolbar-title @click="goHome" style="cursor: pointer">
      <img :src="computedLogo" alt="DUV Logo" class="logo" />
    </v-toolbar-title>

    <!-- Left-aligned Search Component -->
    <SearchComponent class="hidden-md-and-up" />

    <v-spacer></v-spacer>

    <!-- SearchComponent for wider screens -->
    <SearchComponent class="hidden-sm-and-down" />

    <!-- Shortcuts -->
    <!-- Upcoming Events Link -->
    <v-btn
      text
      :to="{ path: '/events', query: { year: 'futur' } }"
      class="nav-item mx-2 hidden-xs-and-down"
      >Upcoming Events</v-btn
    >

    <!-- Results Link -->
    <v-btn
      text
      :to="{ path: '/events', query: { year: 'past1' } }"
      class="nav-item mx-2 hidden-xs-and-down"
      >Results</v-btn
    >

    <!-- Theme switch icon -->
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ themeIcon }}</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        link
        :to="{ path: item.path }"
        :title="item.title"
        :prepend-icon="item.icon"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

import SearchComponent from "./SearchComponent.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Static imports
import logo from "@/assets/duv_logo_with_name.png";
import logoWhite from "@/assets/duv_logo_with_name_white.png";
import logoSymbol from "@/assets/duv_logo_symbol.png";
import logoSymbolWhite from "@/assets/duv_logo_symbol_white.png";

const drawer = ref(false);
const showTitle = ref(false);

const computedLogo = computed(() => {
  if (showTitle.value) {
    return theme.value === "dark" ? logoSymbolWhite : logoSymbol;
  } else {
    return theme.value === "dark" ? logoWhite : logo;
  }
});

const themeIcon = computed(() =>
  theme.value === "light" ? "mdi-weather-night" : "mdi-white-balance-sunny"
);

// Navigation Links
const navItems = [
  { title: "Home", icon: "mdi-home", path: "/" },
  { title: "Calendar", icon: "mdi-calendar", path: "/events/" },
  { title: "About", icon: "mdi-information", path: "/about" },
];

// Window Resizing
const handleResize = () => {
  showTitle.value = window.innerWidth < 960;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// Navigation
const router = useRouter();
const goHome = () => {
  router.push({ path: "/" });
};

// Theme Switching
const theme = inject("theme");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>

<style scoped>
.logo {
  height: 40px;
}

.nav-item {
  text-transform: none;
  font-size: 0.875rem; /* Smaller font size for navigation items */
}

/* Hide elements on medium and larger screens */
.hidden-md-and-up {
  @media (min-width: 960px) {
    display: none;
  }
}

/* Hide elements on small screens */
.hidden-sm-and-down {
  @media (max-width: 959px) {
    display: none;
  }
}
</style>
