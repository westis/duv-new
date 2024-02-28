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
            calendar, results and athlete insights. Dive into our comprehensive
            database for detailed event information and historical performance
            data.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";

const showTitle = ref(false);
const theme = inject("theme");

// Logo logic
import logo from "@/assets/duv_logo_with_name.png";
import logoWhite from "@/assets/duv_logo_with_name_white.png";
import logoSymbol from "@/assets/duv_logo_symbol.png";
import logoSymbolWhite from "@/assets/duv_logo_symbol_white.png";

const computedLogo = computed(() => {
  if (showTitle.value) {
    return theme.value === "dark" ? logoSymbolWhite : logoSymbol;
  } else {
    return theme.value === "dark" ? logoWhite : logo;
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
