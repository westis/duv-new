<template>
  <div class="filters pa-2">
    <v-row>
      <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedYear"
          :items="yearList"
          hide-details="auto"
          label="Year"
        >
        </v-select>
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
        >
        </v-autocomplete>
      </v-col>

      <v-col class="py-1 px-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedEventType"
          hide-details="auto"
          :items="eventTypeList"
          label="Type"
        >
        </v-select>
      </v-col>

      <v-col class="py-1 px-1" cols="6" md="3" sm="4">
        <v-select
          v-model="selectedDistance"
          :items="distanceList"
          item-title="label"
          item-value="value"
          hide-details="auto"
          label="Distance"
          clearable
        ></v-select>
      </v-col>

      <v-col cols="6" md="4" sm="4">
        <v-btn @click="emitFilters" color="primary">Apply Filter</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { defaultParams } from "../utils/fetchCalendarData";

export default {
  props: {
    yearList: { type: Array, required: true },
    countryList: { type: Array, default: () => [] },
    eventTypeList: { type: Array, required: true },
    distanceList: { type: Array, required: true },
  },
  emits: ["filter-updated"],
  setup(props, { emit }) {
    console.log("Props countryList", props.countryList);
    const selectedYear = ref("all");
    const selectedCountry = ref("all");
    const selectedEventType = ref("all");
    const selectedDistance = ref("all");
    // ... Add refs  for other filters

    const emitFilters = () => {
      const filterOptions = {
        year: selectedYear.value || defaultParams.year,
        country: selectedCountry.value || defaultParams.country,
        eventType: selectedEventType.value || defaultParams.mode,
        distance: selectedDistance.value || defaultParams.mode,
      };
      emit("filter-updated", filterOptions);
    };

    return {
      selectedYear,
      selectedCountry,
      selectedEventType,
      selectedDistance,
      emitFilters,
    };
  },
};
</script>
