<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>DUV Ultramarathon Statistics</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="item in navItems"
        :key="item.title"
        text
        :to="{ name: item.routeName }"
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navItems: [
        { title: "Home", routeName: "home" },
        { title: "Calendar", routeName: "calendar" },
        { title: "About", routeName: "about" },
      ],
    };
  },
};
</script>
