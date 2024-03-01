// src/stores/EventsStore.js
import { defineStore } from "pinia";
import { fetchCalendarData } from "@/utils/fetchCalendarData";

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [],
    isLoading: false,
    errorMessage: "",
    currentFilters: {
      year: "past1",
      country: "all",
      dist: "all",
      type: "all",
      yearList: [],
      countryList: [],
      distanceList: [],
      eventTypeList: [],
    },
    pagination: {
      currentPage: 1,
      pageSize: 100, // Assuming 100 events per page as per your API
      totalEvents: 0,
    },
  }),

  actions: {
    async fetchEvents(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        // Merge params with currentFilters, ensuring params take precedence
        const apiParams = {
          ...this.currentFilters, // Defaults from current state
          ...params, // Overrides from method arguments
        };

        const response = await fetchCalendarData(apiParams);
        this.events = response.events;

        // Optionally, update currentFilters with the new parameters used for fetching
        // This step ensures that the store's currentFilters reflect the latest fetch operation
        // It's particularly useful if other parts of your application rely on observing currentFilters
        // to react to changes in the fetched data criteria
        this.currentFilters = {
          ...this.currentFilters,
          ...params,
        };

        // Update pagination information based on the response
        this.pagination.totalEvents = response.totalEvents;
      } catch (error) {
        this.errorMessage = error.message || "Failed to load events.";
      } finally {
        this.isLoading = false;
      }
    },

    // Action to update filters and fetch events
    updateFiltersAndFetch(newFilters) {
      // Update filters
      Object.keys(newFilters).forEach((key) => {
        this.currentFilters[key] = newFilters[key];
      });

      // Fetch events based on updated filters
      this.fetchEvents();
    },
  },
});
