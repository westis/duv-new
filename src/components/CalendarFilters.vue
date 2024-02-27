<template>
  <div class="filters pa-2">
    <v-row>
      <v-col class="py-1" cols="6" md="2" sm="4">
        <v-select v-model="selectedYear" :items="yearList" label="Year">
        </v-select>
      </v-col>

      <v-col class="py-1" cols="6" md="3" sm="4">
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

      <v-col class="py-1" cols="6" md="2" sm="4">
        <v-select
          v-model="selectedEventType"
          :items="eventTypeList"
          label="Type"
        >
        </v-select>
      </v-col>

      <v-col cols="6" md="4" sm="4">
        <v-btn @click="emitFilters" color="primary">Apply Filter</v-btn>
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
    eventTypeList: { type: Array, required: true },
  },
  emits: ["filter-updated"],
  setup(props, { emit }) {
    console.log("Props countryList", props.countryList);
    const selectedYear = ref("all");
    const selectedCountry = ref("all");
    const selectedEventType = ref("all");
    // ... Add refs  for other filters

    const emitFilters = () => {
      console.log("This", this);
      emit("filter-updated", {
        year: selectedYear.value,
        country: selectedCountry.value,
        eventType: selectedEventType.value,
        // ...other filters...
      });
    };

    return {
      selectedYear,
      selectedCountry,
      selectedEventType,
      emitFilters,
    };
  },
};
</script>
