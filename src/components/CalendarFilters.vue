<template>
  <div class="filters pa-2">
    <v-row>
      <v-col cols="4">
        <v-select v-model="selectedYear" :items="yearList" label="Year">
        </v-select>
      </v-col>

      <v-col cols="4">
        <v-select
          v-model="selectedCountry"
          :items="countryList"
          item-text="label"
          item-value="code"
          label="Country"
        >
        </v-select>
      </v-col>

      <v-col cols="4">
        <v-btn @click="emitFilters" color="primary">Fetch Events</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    yearList: { type: Array, required: true },
    countryList: { type: Array, required: true },
  },
  emits: ["filter-updated"],
  setup() {
    const selectedYear = ref(null);
    const selectedCountry = ref(null);
    // ... Add refs  for other filters

    const emitFilters = () => {
      this.$emit("filter-updated", {
        year: selectedYear.value,
        country: selectedCountry.value,
        // ... add other filters as you include them
      });
    };

    return { selectedYear, selectedCountry, emitFilters };
  },
};
</script>
