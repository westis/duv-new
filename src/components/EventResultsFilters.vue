// EventResultsFilters.vue

<template>
  <div class="event-results-filters pa-2">
    <v-row>
      <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedAgeCategory"
          :items="ageCategories"
          item-title="label"
          item-value="value"
          label="Age Category"
          hide-details="auto"
          clearable
        ></v-select>
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
        ></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-btn @click="emitFilters">Apply Filters</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { defaultEventResultsParams } from "@/utils/fetchEventResults";

export default {
  props: {
    ageCategories: { type: Array, required: true },
    countryList: { type: Array, required: true },
  },
  emits: ["filter-updated"],
  setup(props, { emit }) {
    // Log the props to see if they contain the expected data
    console.log("ageCategories:", props.ageCategories);
    console.log("countryList:", props.countryList);
    const selectedAgeCategory = ref(null);
    const selectedCountry = ref(null);

    const emitFilters = () => {
      const filterOptions = {
        cat: selectedAgeCategory.value || defaultEventResultsParams.cat,
        country: selectedCountry.value || defaultEventResultsParams.country,
        // Ensure any additional filters are handled similarly
      };
      emit("filter-updated", filterOptions);
    };

    // Directly return local reactive states and methods; props are automatically available in the template
    return {
      selectedAgeCategory,
      selectedCountry,
      emitFilters,
    };
  },
};
</script>
