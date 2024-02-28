<template>
  <div class="calendar-page">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <h1>Event Calendar</h1>
    <CalendarFilters
      :year-list="filters.yearList"
      :country-list="filters.countryList"
      :event-type-list="filters.eventTypeList"
      :distance-list="filters.distanceList"
      @filter-updated="fetchEvents"
    />

    <CalendarEvents
      :events="events"
      :isLoading="isLoading"
      :eventTypeList="filters.eventTypeList"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CalendarFilters from "../components/CalendarFilters";
import CalendarEvents from "../components/CalendarEvents";
import { fetchCalendarData } from "../utils/fetchCalendarData";

export default {
  components: { CalendarFilters, CalendarEvents },
  setup() {
    const events = ref([]);
    const filters = ref({
      yearList: [],
      countryList: [],
      eventTypeList: [],
      distanceList: [],
    });
    const isLoading = ref(false); // For loading state
    const errorMessage = ref(null);

    const fetchEvents = async (filterOptions) => {
      isLoading.value = true;
      try {
        // Default parameters (adjust as needed)
        const defaultParams = {
          year: "futur",
          dist: "all",
          country: "all",
          cups: "all",
          rproof: 0,
          mode: "list",
        };

        // Merging defaults and user-selected filters
        const params = { ...defaultParams, ...filterOptions };

        // Pass the params object directly, not as a query string
        const response = await fetchCalendarData(params);
        console.log("Fetched Data:", response);
        events.value = response.events;
        filters.value = response.filters;
        console.log("Updated filters in CalendarPage:", filters.value);

        console.log("CalendarPage filters: ", filters);
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        isLoading.value = false;
      }
    };

    // Initial fetch (optional)
    onMounted(async () => {
      await fetchEvents({});
    });

    return { events, filters, isLoading, errorMessage, fetchEvents };
  },
};
</script>

<style>
/* Optional: Add your error message styling here */
.error-message {
  color: red;
  font-weight: bold;
  padding: 10px;
  border: 1px solid red;
}
</style>
