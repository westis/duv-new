<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="goHome" style="cursor: pointer">
      <img :src="computedLogo" alt="DUV Logo" class="logo" />
    </v-toolbar-title>

    <SearchComponent class="hidden-md-and-up" />

    <v-spacer></v-spacer>

    <SearchComponent class="hidden-sm-and-down" />

    <v-btn
      text
      class="nav-item mx-2 hidden-xs-and-down"
      :class="{ 'v-btn--active': isSelectedUpcomingEvents }"
      @click="navigateTo('/events', { year: 'futur' })"
    >
      Upcoming Events
    </v-btn>

    <v-btn
      text
      class="nav-item mx-2 hidden-xs-and-down"
      :class="{ 'v-btn--active': isSelectedResults }"
      @click="navigateTo('/events', { year: 'past1' })"
    >
      Results
    </v-btn>

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
import { inject, computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchComponent from "./SearchComponent.vue";

// Static imports for logos
import logo from "@/assets/duv_logo_with_name.png";
import logoWhite from "@/assets/duv_logo_with_name_white.png";
import logoSymbol from "@/assets/duv_logo_symbol.png";
import logoSymbolWhite from "@/assets/duv_logo_symbol_white.png";

const drawer = ref(false);
const showTitle = ref(false);
const route = useRoute();
const router = useRouter();
const theme = inject("theme"); // Assuming 'theme' is provided in a parent component

// Computed properties for dynamic logos and theme icon
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

const navigateTo = (path, query) => {
  // Retain all existing query parameters except those being explicitly changed
  const newQuery = {
    ...route.query,
    ...query,
  };

  router.push({ path, query: newQuery });
};

const currentYear = new Date().getFullYear();

const isSelectedUpcomingEvents = computed(() => {
  const yearQuery = route.query.year;
  // Future events are selected by "futur" or a year greater than the current year
  return (
    yearQuery === "futur" || (yearQuery && parseInt(yearQuery) > currentYear)
  );
});

const isSelectedResults = computed(() => {
  const yearQuery = route.query.year;
  // Past events are selected by "past1" or a year less than the current year
  return (
    yearQuery === "past1" || (yearQuery && parseInt(yearQuery) < currentYear)
  );
});

// Navigation Links
const navItems = [
  { title: "Home", icon: "mdi-home", path: "/" },
  { title: "Events", icon: "mdi-calendar", path: "/events/" },
  { title: "About", icon: "mdi-information", path: "/about" },
];

// Handle window resizing for responsive logo display
onMounted(() => {
  const handleResize = () => (showTitle.value = window.innerWidth < 960);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
});

// Navigation and Theme Switching Functions
const goHome = () => router.push("/");
const toggleTheme = () =>
  (theme.value = theme.value === "light" ? "dark" : "light");
</script>

<style scoped>
.logo {
  height: 40px;
}

.nav-item {
  text-transform: none;
  font-size: 0.875rem;
}

/* Style for active navigation link */
.active-link {
  background-color: #1976d2; /* Example: a blue background */
  color: white;
  border-radius: 4px; /* Optional: adds rounded corners */
}

/* Hide elements based on screen size */
.hidden-md-and-up {
  @media (min-width: 960px) {
    display: none;
  }
}

.hidden-sm-and-down {
  @media (max-width: 959px) {
    display: none;
  }
}
</style>
