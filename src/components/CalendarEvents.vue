<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="events.length > 0">
    <v-container>
      <v-row class="mt-2">
        <v-col
          class="pa-0 mb-3"
          v-for="event in paginatedEvents"
          :key="event.EventID"
          cols="12"
        >
          <v-card
            :class="[getEventProps(event.Results).cardClass, 'elevation-1']"
          >
            <v-card-title class="race-name py-1 bg-grey-darken-3">
              {{ event.EventName }}
            </v-card-title>
            <v-alert
              class="mb-2 rounded-0"
              v-if="getEventProps(event.Results).message"
              type="error"
              variant="outlined"
              density="compact"
              text
            >
              {{ getEventProps(event.Results).message }}
            </v-alert>

            <v-row>
              <v-col cols="3" sm="2" xl="1" class="py-5 px-6">
                <v-sheet
                  class="pa-1 d-flex flex-column align-center rounded-lg date-container"
                >
                  <v-sheet class="date-day font-weight-bold">
                    {{ formatDate(event.Startdate, "DD") }}
                  </v-sheet>
                  <v-sheet class="date-month">
                    {{ formatDate(event.Startdate, "MMM") }}
                  </v-sheet>
                  <v-sheet class="date-year text-medium-emphasis">
                    {{ formatDate(event.Startdate, "YYYY") }}
                  </v-sheet>
                </v-sheet>
              </v-col>

              <v-col
                cols="5"
                sm="5"
                md="6"
                class="py-4 px-0 d-flex flex-column align-left justify-center"
              >
                <v-sheet class="my-1">
                  <v-icon class="ml-2" small>mdi-map-marker</v-icon>
                  {{ event.City }}, {{ event.Country }}
                </v-sheet>

                <v-sheet class="chip-container my-2">
                  <v-chip
                    label
                    class="mx-2 my-1"
                    size="small"
                    v-if="event.Length"
                    :color="getTypeColor(15)"
                  >
                    <v-icon start>mdi-ruler</v-icon>{{ event.Length }}
                  </v-chip>

                  <v-chip
                    label
                    class="mx-2 my-1"
                    size="small"
                    v-if="event.Duration && event.EventType !== 10"
                    :color="getTypeColor(16)"
                  >
                    <v-icon start>mdi-timer</v-icon>{{ event.Duration }}
                  </v-chip>

                  <v-chip
                    label
                    class="mx-2 my-1"
                    size="small"
                    :color="getTypeColor(event.EventType)"
                  >
                    <v-icon start>{{ getEventIcon(event.EventType) }} </v-icon>

                    {{ filteredEventTypes(event.EventType) }}
                  </v-chip>
                </v-sheet>
              </v-col>

              <v-col
                cols="4"
                sm="4"
                class="py-4 px-4 d-flex flex-column align-center justify-center"
              >
                <v-btn
                  class="ma-2 bg-primary"
                  size="small"
                  text
                  :to="`/event/${event.EventID}`"
                >
                  <v-icon start>mdi-information-outline</v-icon>
                  Event Details
                </v-btn>

                <v-btn
                  class="ma-2 bg-primary"
                  size="small"
                  text
                  :disabled="getEventProps(event.Results).buttonDisabled"
                  :href="
                    getEventProps(event.Results).buttonTo
                      ? `/results/${event.EventID}`
                      : undefined
                  "
                >
                  <v-icon start>{{
                    getEventProps(event.Results).buttonIcon
                  }}</v-icon>
                  {{ getEventProps(event.Results).buttonLabel }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>No events found.</div>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="5"
  ></v-pagination>
</template>

<script setup>
import { ref, computed, defineProps, inject } from "vue";
import { watchEffect } from "vue";

// Props
const props = defineProps({
  events: { type: Array, required: true },
  isLoading: { type: Boolean, required: true },
  eventTypeList: { type: Array, required: true },
});

// Access the provided theme state
const theme = inject("theme"); // Ensure 'theme' is provided at the root or a parent component

watchEffect(() => {
  console.log("Theme changed to:", theme.value);
});

// Reactive states
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = computed(() => props.events.length);

// Type name map
const typeNameMap = {
  "road race": "Road",
  "trail race": "Trail",
  "road race on a loop < 5km/3mi": "Road Loop",
  "stage race": "Stage",
  track: "Track",
  indoor: "Indoor",
  "friendship run, no competition": "Friendship",
  "invitational race": "Invitational",
  "elimination race": "Elimination Race",
  "Backyard Ultra": "Backyard Ultra",
  "walking road": "Walk (Road)",
  "walking road on a loop < 5km/3mi": "Walk Loop",
  "walking track": "Walk (Track)",
  "walking indoor": "Walk (Indoor)",
};

// Color map adapted for light and dark mode
const dynamicColorMap = computed(() => ({
  1: theme.value === "dark" ? "grey-lighten-2" : "grey-darken-4", // Road event
  2: theme.value === "dark" ? "green-lighten-2" : "green-darken-4", // Trail event
  3: theme.value === "dark" ? "blue-grey-lighten-2" : "blue-grey-darken-4", // Road race on a loop
  4: theme.value === "dark" ? "pink-lighten-2" : "pink-darken-4", // Stage race
  5: theme.value === "dark" ? "deep-orange-lighten-2" : "deep-orange-darken-4", // Track
  6: theme.value === "dark" ? "indigo-lighten-2" : "indigo-darken-4", // Indoor
  7: theme.value === "dark" ? "deep-purple lighten-2" : "purple-darken-4", // Friendship run
  8: theme.value === "dark" ? "indigo-lighten-2" : "deep-purple-darken-4", // Invitational race
  9: theme.value === "dark" ? "red-lighten-2" : "red-darken-4", // Elimination race
  10: theme.value === "dark" ? "brown-lighten-2" : "brown-darken-3", // Backyard Ultra
  11: theme.value === "dark" ? "lime-lighten-2" : "yellow-darken-4", // Walking road
  12: theme.value === "dark" ? "lime-lighten-2" : "yellow-darken-4", // Walking road (loop)
  13: theme.value === "dark" ? "lime-lighten-2" : "yellow-darken-4", // Walking track
  14: theme.value === "dark" ? "lime-lighten-2" : "yellow-darken-4", // Walking indoor
  15: theme.value === "dark" ? "teal-lighten-2" : "teal-darken-4", // Duration
  16: theme.value === "dark" ? "light-blue-lighten-2" : "light-blue-darken-4", // Length
}));

// Icon map remains the same
const iconMap = {
  1: "mdi-highway", // Road Races
  2: "mdi-tree", // Trail Races
  3: "mdi-reload", // Road Race on a Loop
  4: "mdi-flag-checkered", // Stage Race
  5: "mdi-run", // Track Events
  6: "mdi-home-variant", // Indoor Events
  7: "mdi-account-group", // Friendship Run
  8: "mdi-medal", // Invitational Race
  9: "mdi-minus-circle", // Elimination Race
  10: "mdi-timer-sand", // Backyard Ultra
  11: "mdi-walk", // Walking Road
  12: "mdi-foot-print", // Walking Road (Loop)
  13: "mdi-map-marker-path", // Walking Track
  14: "mdi-warehouse", // Walking Indoor
};

const getEventProps = (resultsStatus) => {
  let props = {
    cardClass: "", // Class to apply different styles
    message: "", // Optional message to display on the card
    buttonDisabled: false, // Whether the Results button should be disabled
    buttonLabel: "View Results", // Label for the Results button
    buttonTo: true, // Determines if the button should have a navigation link
    buttonIcon: "mdi-trophy-outline", // Default icon for the Results button
  };
  switch (resultsStatus) {
    case "C": // Completed
    case "P": // Pending
      props.buttonIcon = "mdi-trophy-outline";
      break;
    case "N": // No Results
      props.buttonDisabled = true;
      props.buttonLabel = "No Results";
      props.buttonTo = false;
      props.buttonIcon = "mdi-close-box-outline";
      break;
    case "R": // Cancelled
      props.cardClass = "race-cancelled";
      props.message = "This race has been cancelled.";
      props.buttonDisabled = true;
      props.buttonLabel = "Cancelled";
      props.buttonTo = false;
      props.buttonIcon = "mdi-cancel";
      break;
    case "Z": // No Finishers
      props.buttonDisabled = true;
      props.buttonLabel = "No Finishers";
      props.buttonTo = false;
      props.buttonIcon = "mdi-emoticon-sad-outline";
      break;
    case "O": // Postponed
      props.cardClass = "race-postponed";
      props.message = "This race has been postponed.";
      props.buttonDisabled = true;
      props.buttonTo = false;
      props.buttonIcon = "mdi-clock-outline";
      break;
    // Add more cases as needed
  }

  return props;
};

// Computed properties for pagination and event type mapping
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.events.slice(start, end);
});

// Methods
function formatDate(dateString, format) {
  const date = new Date(dateString);

  // Use specific format specifiers based on the format string:
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", {
    month: format === "MMM" ? "short" : "long",
  });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });

  // Return the formatted parts based on the format:
  switch (format) {
    case "DD":
      return day;
    case "MMM":
      return month;
    case "YYYY":
      return year;
    default:
      return dateString; // Return full date for unknown formats
  }
}

function getTypeColor(eventType) {
  return dynamicColorMap.value[eventType] || "default-color";
}

function getEventIcon(eventType) {
  return iconMap[eventType] || "mdi-help-circle";
}

function filteredEventTypes(eventType) {
  const typeIndex = +eventType - 1;
  const fullTypeName = props.eventTypeList[typeIndex] || "Unknown Event Type";
  return typeNameMap[fullTypeName] || fullTypeName;
}
</script>
