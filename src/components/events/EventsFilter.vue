// src/components/events/EventsFilters.vue
<template>
  <div class="filters pa-2">
    <v-row>
      <v-col class="py-1 px-1" cols="6" md="3" sm="4">
        <v-select
          v-model="selectedYear"
          :items="transformedYearList"
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
const route = useRoute();
const router = useRouter();

const props = defineProps({
  yearList: Array,
  countryList: Array,
  distanceList: Array,
  eventTypeList: Array,
});

const selectedYear = ref(route.query.year || "all");
const selectedCountry = ref(route.query.country || "all");
const selectedDistance = ref(route.query.dist || "all");

// Transform yearList to include human-readable text
const transformedYearList = computed(() => {
  return props.yearList.map((year) => {
    switch (year) {
      case "futur":
        return { value: year, title: "Future Events" };
      case "past1":
        return { value: year, title: "Previous Year" };
      default:
        return { value: year.toString(), title: year.toString() };
    }
  });
});

// Watch the route to update selectedYear when query parameters change
watch(
  () => route.query.year,
  (newYear) => {
    selectedYear.value = newYear || "all";
  }
);

const applyFilters = () => {
  router.replace({
    path: "/events",
    query: {
      year: selectedYear.value || undefined,
      country: selectedCountry.value || undefined,
      dist: selectedDistance.value || undefined,
    },
  });
};
</script>
