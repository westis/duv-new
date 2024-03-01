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
        console.log("API Response:", response); // Debug log
        this.events = response.events;

        // Update currentFilters with new parameters and preserve filter lists from the API response
        this.currentFilters.year = params.year || this.currentFilters.year;
        this.currentFilters.country =
          params.country || this.currentFilters.country;
        this.currentFilters.dist = params.dist || this.currentFilters.dist;

        // Explicitly update the filter lists with those from the API response
        this.currentFilters.yearList = response.filters.yearList;
        this.currentFilters.countryList = response.filters.countryList;
        this.currentFilters.distanceList = response.filters.distanceList;
        this.currentFilters.eventTypeList = response.filters.eventTypeList; // Assuming this is also part of the response and needs updating

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
