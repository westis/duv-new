<template>
  <div class="filters pa-2">
    <v-row>
      <v-col cols="2">
        <v-select v-model="selectedYear" :items="yearList" label="Year">
        </v-select>
      </v-col>

      <v-col cols="3">
        <v-autocomplete
          auto-select-first
          v-model="selectedCountry"
          :items="countryList"
          item-title="label"
          item-value="code"
          label="Country"
        >
        </v-autocomplete>
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
    countryList: { type: Array, default: () => [] },
  },
  emits: ["filter-updated"],
  setup(props, { emit }) {
    console.log("Props countryList", props.countryList);
    const selectedYear = ref("all");
    const selectedCountry = ref("all");
    // ... Add refs  for other filters

    const emitFilters = () => {
      console.log("This", this);
      emit("filter-updated", {
        year: selectedYear.value,
        country: selectedCountry.value,
        // ...other filters...
      });
    };

    return {
      selectedYear,
      selectedCountry,
      emitFilters,
    };
  },
};
</script>
