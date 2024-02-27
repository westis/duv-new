<template>
  <div>
    <EventResultsHeader :eventHeader="eventHeader" />
    <EventResultsFilters
      :ageCategories="ageCategories"
      :countries="countries"
      @filter="fetchFilteredResults"
    />
    <EventResults :resultList="resultList" />
  </div>
</template>

<script>
import { fetchEventResults } from "@/utils/fetchEventResults";
import EventResults from "@/components/EventResults";
import EventResultsHeader from "@/components/EventResultsHeader";
import EventResultsFilters from "@/components/EventResultsFilters";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { EventResults, EventResultsHeader, EventResultsFilters },
  setup() {
    const eventHeader = ref({});
    const resultList = ref([]);
    const ageCategories = ref([]);
    const countries = ref([]);

    const route = useRoute();
    const eventId = route.params.id;

    const selectedCountry = ref(null);
    const selectedAgeCategory = ref(null);

    const fetchFilteredResults = async () => {
      const filters = {};
      if (selectedCountry.value) {
        filters.country = selectedCountry.value;
      }
      // Add other filters to the filters object similarly
      if (selectedAgeCategory.value) {
        filters.ageCategory = selectedAgeCategory.value;
      }

      try {
        // Directly pass eventId and filters to fetchEventResults
        // No need to manually construct query string here, let fetchEventResults handle it
        const data = await fetchEventResults(eventId, filters);

        eventHeader.value = data.eventHeader; // Adjusted based on the updated fetchEventResults structure
        resultList.value = data.resultList; // Adjusted based on the updated fetchEventResults structure

        // Mapping age categories and countries from the filters object within the returned data
        // These need to match the structure provided by your updated fetchEventResults
        ageCategories.value = data.filters.ageCategories.map(
          ({ value, label }) => ({
            text: label,
            value: value,
          })
        );

        countries.value = data.filters.countryList.map(({ code, label }) => ({
          code: code,
          label: label,
        }));
      } catch (error) {
        console.error("Failed to fetch event results:", error);
      }
    };

    onMounted(() => {
      fetchFilteredResults();
    });

    return {
      eventHeader,
      resultList,
      ageCategories,
      countries,
      fetchFilteredResults,
    };
  },
};
</script>
