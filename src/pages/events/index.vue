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
import { useEventsStore } from "@/stores/EventsStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const eventsStore = useEventsStore();

// Utilize Pinia store state and actions
const { events, isLoading, errorMessage, currentFilters } =
  storeToRefs(eventsStore);

const eventCalendarTitle = computed(() => {
  let titleParts = [];
  // Access refs with .value when within the Composition API context
  if (currentFilters.value.year === "past1") {
    titleParts.push("Past Events");
  } else if (currentFilters.value.year === "futur") {
    titleParts.push("Future Events");
  } else if (currentFilters.value.year !== "all") {
    titleParts.push(`Events in ${currentFilters.value.year}`);
  }
  // Correct usage of .find on a ref array by accessing .value
  const selectedCountry = currentFilters.value.countryList.find(
    (country) => country.code === currentFilters.value.country
  );
  if (selectedCountry && currentFilters.value.country !== "all") {
    titleParts.push(`for ${selectedCountry.label} (${selectedCountry.code})`);
  }
  if (currentFilters.value.dist !== "all") {
    titleParts.push(` - ${currentFilters.value.dist}`);
  }
  return titleParts.join(" ");
});

// Handle updates from the EventsFilter component
const handleFilterUpdate = (newFilters) => {
  eventsStore.updateFiltersAndFetch(newFilters);
};

// Watching for route query changes to update filters and fetch new events
watch(
  () => route.query,
  (newQuery) => {
    eventsStore.currentFilters.year =
      newQuery.year || eventsStore.currentFilters.year;
    eventsStore.currentFilters.country =
      newQuery.country || eventsStore.currentFilters.country;
    eventsStore.currentFilters.dist =
      newQuery.dist || eventsStore.currentFilters.dist;
    eventsStore.currentFilters.type =
      newQuery.type || eventsStore.currentFilters.type;
    eventsStore.fetchEvents();
  },
  { deep: true }
);

onMounted(() => {
  eventsStore.fetchEvents();
});
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 10px;
  border: 1px solid red;
}
</style>
