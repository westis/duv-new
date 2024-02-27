<template>
  <v-btn
    class="app-btn search-btn"
    @click="openSearch"
    v-on:keyup.ctrl.k="openSearch"
    aria-haspopup="dialog"
    aria-expanded="false"
  >
    <v-icon>mdi-magnify</v-icon>
    <span>Search </span>
  </v-btn>
</template>

<script>
export default {
  name: "SearchComponent",
  methods: {
    openSearch() {
      console.log("Open search functionality");
      // Emit an event to signal the parent component
      this.$emit("openSearchDialog");
    },
  },
};
</script>

<style scoped>
.search-btn {
  text-transform: none;
  color: white; /* Adjust based on your app's color scheme */
}

.shortcut {
  margin-left: 8px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  padding: 0 4px;
}
</style>
