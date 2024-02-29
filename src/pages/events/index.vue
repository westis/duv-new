<template>
  <div class="calendar-page">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <h1>{{ eventCalendarTitle }}</h1>
    <EventsFilter
      :year-list="currentFilters.yearList"
      :country-list="currentFilters.countryList"
      :distance-list="currentFilters.distanceList"
      :event-type-list="currentFilters.eventTypeList"
      @filter-updated="handleFilterUpdate"
    />
    <EventsList
      :events="events"
      :isLoading="isLoading"
      :eventTypeList="currentFilters.eventTypeList"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchCalendarData, defaultParams } from "@/utils/fetchCalendarData";

const route = useRoute();
const events = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

// Setup a reactive state for the current filters
const currentFilters = reactive({
  year: route.query.year || defaultParams.year,
  country: route.query.country || defaultParams.country,
  dist: route.query.dist || defaultParams.dist,
  type: route.query.type || defaultParams.type,
  yearList: [],
  countryList: [],
  distanceList: [],
  eventTypeList: [],
});

const eventCalendarTitle = computed(() => {
  let titleParts = [];
  if (currentFilters.year === "past1") {
    titleParts.push("Past Events");
  } else if (currentFilters.year === "futur") {
    titleParts.push("Future Events");
  } else if (currentFilters.year !== "all") {
    titleParts.push(`Events in ${currentFilters.year}`);
  }
  const selectedCountry = currentFilters.countryList.find(
    (country) => country.code === currentFilters.country
  );
  if (selectedCountry && currentFilters.country !== "all") {
    titleParts.push(`for ${selectedCountry.label} (${selectedCountry.code})`);
  }
  if (currentFilters.dist !== "all") {
    titleParts.push(` - ${currentFilters.dist}`);
  }
  return titleParts.join(" ");
});

// Handle updates from the EventsFilter component
const handleFilterUpdate = (newFilters) => {
  Object.assign(currentFilters, newFilters);
  fetchEvents();
};

const fetchEvents = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const response = await fetchCalendarData({
      year: currentFilters.year,
      country: currentFilters.country,
      dist: currentFilters.dist,
      type: currentFilters.type,
    });
    events.value = response.events;
    // Assuming response.filters contains updated lists
    Object.assign(currentFilters, response.filters);
  } catch (error) {
    errorMessage.value = error.message || "Failed to load events.";
  } finally {
    isLoading.value = false;
  }
};

// Watch for route query changes to update filters and fetch new events
watch(
  () => route.query,
  (newQuery) => {
    currentFilters.year = newQuery.year || defaultParams.year;
    currentFilters.country = newQuery.country || defaultParams.country;
    currentFilters.dist = newQuery.dist || defaultParams.dist;
    currentFilters.type = newQuery.type || defaultParams.type;
    fetchEvents();
  },
  { deep: true }
);

onMounted(fetchEvents);
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 10px;
  border: 1px solid red;
}
</style>
