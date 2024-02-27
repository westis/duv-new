<template>
  <div class="event-results-filters pa-2">
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="selectedAgeCategory"
          :items="ageCategories"
          label="Age Category"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="selectedCountry"
          :items="countries"
          item-text="label"
          item-value="code"
          label="Country"
          return-object
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-btn @click="applyFilters">Apply Filters</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    ageCategories: { type: Array, default: () => [] },
    countries: { type: Array, default: () => [] },
  },
  emits: ["filter"], // Emitting an event to the parent component when filters are applied
  setup(props, { emit }) {
    // Reactive properties to hold the selected values of age category and country
    const selectedAgeCategory = ref("");
    const selectedCountry = ref("");

    // Function to be called when the user applies filters
    const applyFilters = () => {
      emit("filter", {
        ageCategory: selectedAgeCategory.value,
        country: selectedCountry.value,
      });
    };

    // Returning reactive properties and functions so they can be used in the template
    return { selectedAgeCategory, selectedCountry, applyFilters };
  },
};
</script>
