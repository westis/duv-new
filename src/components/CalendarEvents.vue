<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="events.length > 0">
    <v-container>
      <v-row>
        <v-col v-for="event in paginatedEvents" :key="event.EventID" cols="12">
          <v-card class="elevation-1">
            <v-card-title class="race-name py-1 bg-grey-darken-3">{{
              event.EventName
            }}</v-card-title>

            <v-row>
              <v-col cols="12" md="2" class="py-5 px-6">
                <div class="date-container">
                  <div class="date-day font-weight-bold">
                    {{ formatDate(event.Startdate, "DD") }}
                  </div>
                  <div class="date-month">
                    {{ formatDate(event.Startdate, "MMM") }}
                  </div>
                  <div class="date-year text-medium-emphasis">
                    {{ formatDate(event.Startdate, "YYYY") }}
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="7" class="py-6 px-2">
                <div class="city-container">
                  <v-card-subtitle class="mb-4 pa-0">
                    <v-icon class="ml-2" small>mdi-map-marker</v-icon>
                    {{ event.City }}, {{ event.Country }}
                  </v-card-subtitle>
                </div>

                <div class="chip-container mb-4">
                  <v-chip
                    label
                    class="mx-2"
                    size="small"
                    v-if="event.Length"
                    :color="getTypeColor(15)"
                  >
                    <v-icon start>mdi-ruler</v-icon>{{ event.Length }}
                  </v-chip>

                  <v-chip
                    label
                    class="mx-2"
                    size="small"
                    v-if="event.Duration && event.EventType !== 10"
                    :color="getTypeColor(16)"
                  >
                    <v-icon start>mdi-timer</v-icon>{{ event.Duration }}
                  </v-chip>

                  <v-chip
                    label
                    class="mx-2"
                    size="small"
                    :color="getTypeColor(event.EventType)"
                  >
                    <v-icon start>{{ getEventIcon(event.EventType) }} </v-icon>

                    {{ filteredEventTypes(event.EventType) }}
                  </v-chip>
                </div>
              </v-col>

              <v-col cols="12" md="3" class="py-4">
                <div class="actions-container">
                  <v-btn
                    class="ma-2 bg-primary"
                    size="small"
                    text
                    :to="`/event/${event.EventID}`"
                  >
                    <v-icon start>mdi-information-outline</v-icon>
                    Event Details
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-2 bg-primary"
                    size="small"
                    text
                    :to="`/results/${event.EventID}`"
                  >
                    <v-icon start>mdi-trophy-outline</v-icon>
                    Results
                  </v-btn>
                </div>
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

<script>
export default {
  props: {
    events: { type: Array, required: true },
    isLoading: { type: Boolean, required: true },
    eventTypeList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: "Event Name", value: "EventName" },
        { text: "Details", value: "details" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      typeNameMap: {
        "road race": "Road",
        "trail race": "Trail",
        "road race on a loop < 5km/3mi": "Road Loop",
        "stage race": "Stage",
        track: "Track",
        indoor: "Indoor",
        "friendship run, no competition": "Friendship",
        "invitational race": "Invitational",
        "elimination race": "Elimination",
        "Backyard Ultra": "Backyard Ultra",
        "walking road": "Walk (Road)",
        "walking road on a loop < 5km/3mi": "Walk Loop",
        "walking track": "Walk (Track)",
        "walking indoor": "Walk (Indoor)",
      },
      colorMap: {
        1: "blue", // Road event
        2: "green", // Trail event
        3: "lightblue", // Road race on a loop
        4: "teal", // Stage race
        5: "orange", // Track
        6: "gray", // Indoor
        7: "purple", // Friendship run
        8: "purple", // Invitational race
        9: "red", // Elimination race
        10: "purple", // Backyard Ultra
        11: "yellow", // Walking road
        12: "yellow", // Walking road (loop)
        13: "yellow", // Walking track
        14: "yellow", // Walking indoor
        15: "orange", // Duration
        16: "yellow", // Length
      },
      iconMap: {
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
      },
      currentPage: 1,
      itemsPerPage: 10, // Adjust as needed
      totalItems: this.events.length, // Your custom icon name
    };
  },
  computed: {
    // Compute the total number of pages
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    // Compute the events to display on the current page
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.events.slice(start, end);
    },
  },
  methods: {
    formatDate(dateString, format) {
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
    },
    getTypeColor(eventType) {
      return this.colorMap[eventType] || "default-color";
    },
    getEventIcon(eventType) {
      return this.iconMap[eventType] || "mdi-help-circle";
    },

    filteredEventTypes(eventType) {
      const typeIndex = +eventType - 1;
      const fullTypeName =
        this.eventTypeList[typeIndex] || "Unknown Event Type";

      return this.typeNameMap[fullTypeName] || fullTypeName;
    },
  },
};
</script>
