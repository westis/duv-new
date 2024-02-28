// src/components/CalendarFilters.vue
<template>
  <div class="filters pa-2">
    <v-row>
      <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedYear"
          :items="yearList"
          hide-details="auto"
          label="Year"
        >
        </v-select>
      </v-col>

      <v-col class="py-1 px-1" cols="6" md="3" sm="4">
        <v-autocomplete
          auto-select-first
          clearable
          v-model="selectedCountry"
          :items="countryList"
          hide-details="auto"
          item-title="label"
          item-value="code"
          label="Country"
        >
        </v-autocomplete>
      </v-col>

      <!-- <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedEventType"
          hide-details="auto"
          :items="eventTypeList"
          label="Type"
        >
        </v-select>
      </v-col> -->

      <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedDistance"
          :items="distanceList"
          item-title="label"
          item-value="value"
          hide-details="auto"
          label="Distance"
          clearable
        ></v-select>
      </v-col>

      <v-col cols="6" md="4" sm="4">
        <v-btn @click="applyFilters" color="primary">Apply Filters</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Assuming props are already defined to pass down the filter options lists
const props = defineProps({
  yearList: Array,
  countryList: Array,
  distanceList: Array,
  eventTypeList: Array, // If you are using eventType
});

// Initialize selected filters based on URL query parameters
const selectedYear = ref(route.query.year || "all");
const selectedCountry = ref(route.query.country || "all");
const selectedDistance = ref(route.query.dist || "all");
// Initialize selectedEventType if you are using eventType

// Watch for changes in selected filters and update the URL accordingly
/* watch(
  [selectedYear, selectedCountry, selectedDistance],
  () => {
    router.replace({
      path: "/events",
      query: {
        year: selectedYear.value || undefined, // Fallback to undefined if cleared
        country: selectedCountry.value || undefined,
        dist: selectedDistance.value || undefined,
      },
    });
  },
  { immediate: true }
); */

// If you have an "Apply Filters" button or similar, you can use a method to update the route
// This might be redundant if you're already watching filter changes as above
const applyFilters = () => {
  router.replace({
    path: "/events",
    query: {
      year: selectedYear.value || undefined, // Fallback to undefined if cleared
      country: selectedCountry.value || undefined,
      dist: selectedDistance.value || undefined,
    },
  });
};
</script>
