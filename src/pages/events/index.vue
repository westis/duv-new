// pages/events/index.vue
<template>
  <div class="calendar-page">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <h1>{{ eventCalendarTitle }}</h1>
    <!-- Update: Use handleFilterUpdate to handle filter updates -->
    <CalendarFilters
      :year-list="currentFilters.yearList"
      :country-list="currentFilters.countryList"
      :distance-list="currentFilters.distanceList"
      :event-type-list="currentFilters.eventTypeList"
      @filter-updated="handleFilterUpdate"
    />

    <CalendarEvents
      :events="events"
      :isLoading="isLoading"
      :eventTypeList="currentFilters.eventTypeList"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CalendarFilters from "@/components/CalendarFilters.vue";
import CalendarEvents from "@/components/CalendarEvents.vue";
import { fetchCalendarData, defaultParams } from "@/utils/fetchCalendarData";

const route = useRoute();
const router = useRouter();
const events = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

// Define a reactive state for filters based on what your API returns
const currentFilters = reactive({
  year: route.query.year || defaultParams.year,
  country: route.query.country || defaultParams.country,
  dist: route.query.dist || defaultParams.dist,
  type: route.query.type || defaultParams.type, // Only if supported
  // Initialize filter lists with empty arrays; they will be populated after the API call
  yearList: [],
  countryList: [],
  distanceList: [],
  eventTypeList: [],
});

// Computed property for dynamic event calendar title
const eventCalendarTitle = computed(() => {
  let titleParts = [];

  // Adjusting for Future and Past Events
  if (currentFilters.year === "past1") {
    titleParts.push("Past Events");
  } else if (currentFilters.year === "futur") {
    titleParts.push("Future Events");
  } else if (currentFilters.year !== "all") {
    // Adjusting format for specific years
    titleParts.push(`Events in ${currentFilters.year}`);
  }

  // Append country information if selected
  const selectedCountryCode = currentFilters.country;
  const selectedCountry = currentFilters.countryList.find(
    (country) => country.code === selectedCountryCode
  );
  if (selectedCountry && selectedCountryCode !== "all") {
    titleParts.push(`for ${selectedCountry.label} (${selectedCountry.code})`);
  }

  // Append distance information if selected
  if (currentFilters.dist !== "all") {
    titleParts.push(` - ${currentFilters.dist}`);
  }

  return titleParts.join(" ");
});

// Function to handle filter updates
const handleFilterUpdate = (newFilters) => {
  Object.assign(currentFilters, newFilters);
  fetchEvents();
};

// Fetch events based on current filters
const fetchEvents = async () => {
  isLoading.value = true;
  try {
    // Fetch events and filter options from the API
    const response = await fetchCalendarData({
      ...currentFilters,
      page: 1, // Reset to page 1 or maintain current pagination
    });

    events.value = response.events;

    // Update filter lists
    currentFilters.yearList = response.filters.yearList;
    currentFilters.countryList = response.filters.countryList;
    currentFilters.distanceList = response.filters.distanceList;
    currentFilters.eventTypeList = response.filters.eventTypeList || []; // If eventTypeList is optional
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

// React to changes in route query parameters
watch(
  () => route.query,
  (newQuery) => {
    currentFilters.year = newQuery.year || defaultParams.year;
    currentFilters.country = newQuery.country || defaultParams.country;
    currentFilters.dist = newQuery.dist || defaultParams.dist;
    // currentFilters.type = newQuery.type || defaultParams.type; // Update if API supports eventType
    fetchEvents();
  },
  { deep: true }
);

// Initialize
onMounted(fetchEvents);
</script>

<style>
/* Your existing styles */
.error-message {
  color: red;
  font-weight: bold;
  padding: 10px;
  border: 1px solid red;
}
</style>
