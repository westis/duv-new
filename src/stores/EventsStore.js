// src/stores/EventsStore.js
import { defineStore } from "pinia";
import { fetchCalendarData } from "@/utils/fetchCalendarData";

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [],
    isLoading: false,
    errorMessage: "",
    currentFilters: {
      year: "futur",
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
        const response = await fetchCalendarData({
          year: this.currentFilters.year,
          country: this.currentFilters.country,
          dist: this.currentFilters.dist,
          type: this.currentFilters.type,
          ...params,
        });
        this.events = response.events;
        Object.assign(this.currentFilters, response.filters);

        // Update the pagination.totalEvents with the extracted total events count
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
