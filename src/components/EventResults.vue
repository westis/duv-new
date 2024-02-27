<template>
  <v-card>
    <v-card-title>Results: {{ eventHeader.SearchRsltCnt }}</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="resultList"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #[`item.Performance`]="{ item }">
          <span
            :style="{ color: getPerformanceColor(item.PerformanceNumeric) }"
          >
            {{ item.Performance }}
          </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    eventHeader: {
      type: Object,
      default: () => ({}),
    },
    resultList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const headers = ref([
      { title: "Rank", value: "RankTotal" },
      { title: "Performance", value: "Performance" },
      { title: "Athlete", value: "AthleteName" },
      { title: "Club", value: "Club" },
      { title: "Nat.", value: "Nationality" },
      { title: "YOB", value: "YOB" },
      { title: "Gender", value: "Gender" },
      { title: "Gender Rank", value: "RankMW" },
      { title: "Age Cat.", value: "Cat" },
      { title: "Age Rank", value: "RankCat" },
      // Ensure these values match the property names in your resultList items
    ]);

    const getPerformanceColor = (performanceNumeric) => {
      // Example calculation for color, adjust based on your logic and data
      const maxPerformance = Math.max(
        ...props.resultList.map((item) => item.PerformanceNumeric)
      );
      const minPerformance = Math.min(
        ...props.resultList.map((item) => item.PerformanceNumeric)
      );
      const performanceRatio =
        (performanceNumeric - minPerformance) /
        (maxPerformance - minPerformance);
      const hue = (120 * (1 - performanceRatio)).toFixed(0); // 120 = green, 0 = red
      return `hsl(${hue}, 100%, 50%)`;
    };

    return {
      headers,
      getPerformanceColor,
    };
  },
};
</script>
