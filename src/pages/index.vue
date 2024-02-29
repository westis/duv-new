<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <img :src="computedLogo" alt="DUV Logo" class="logo" />
        </v-col>
        <v-col cols="12">
          <h1>Welcome to the DUV Ultramarathon Statistics</h1>
          <p>
            Your one-stop destination for ultramarathon events statistics,
            calendar, results, and athlete insights. Dive into our comprehensive
            database for detailed event information and historical performance
            data.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/stores/ThemeStore"; // Assuming themeStore is correctly set up for auto-imports

// Static imports for logos
import logo from "@/assets/duv_logo_with_name.png";
import logoWhite from "@/assets/duv_logo_with_name_white.png";
import logoSymbol from "@/assets/duv_logo_symbol.png";
import logoSymbolWhite from "@/assets/duv_logo_symbol_white.png";

const themeStore = useThemeStore();

// Since you're using Unplugin Auto Import, there's no need to explicitly import `ref` and `computed`
const showTitle = ref(false);

// Updated logo logic to use themeStore for theme checks
const computedLogo = computed(() => {
  // Determining which logo to use based on the current theme and whether the title is shown
  if (showTitle.value) {
    return themeStore.currentTheme === "dark" ? logoSymbolWhite : logoSymbol;
  } else {
    return themeStore.currentTheme === "dark" ? logoWhite : logo;
  }
});
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.logo {
  max-width: 200px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
}
</style>
