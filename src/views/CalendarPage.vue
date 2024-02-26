<template>
  <div class="calendar-page">
    <v-alert>
      {{ errorMessage }}
    </v-alert>
    <h1>Event Calendar</h1>
    <CalendarFilters
      :year-list="filters.yearList"
      :country-list="filters.countryList"
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
    const filters = ref({ yearList: [], countryList: [], eventTypeList: [] });
    const isLoading = ref(false); // For loading state
    const errorMessage = ref(null);

    const fetchEvents = async (filterOptions) => {
      isLoading.value = true;
      try {
        // Construct the query string
        const queryString = Object.entries(filterOptions)
          .map(([key, value]) => {
            return value
              ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
              : null;
          })
          .filter(Boolean)
          .join("&");

        const response = await fetchCalendarData(queryString);
        events.value = response.events;
        filters.value = response.filters;
        console.log("CalendarPage filters: ", filters);
      } catch (error) {
        errorMessage.value = error.message; // Set the error message
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
