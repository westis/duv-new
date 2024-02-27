import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalendarPage from "../views/CalendarPage.vue";
import ResultsPage from "../views/ResultsPage.vue";
import EventResultsPage from "@/views/EventResultsPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/calendar", // The route for your calendar page
    name: "calendar",
    component: CalendarPage,
  },
  {
    path: "/results",
    name: "results",
    component: ResultsPage, // Make sure to import and define ResultsView
  },
  {
    path: "/results/:id",
    name: "EventResults",
    component: EventResultsPage,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
