import Index from "@/views/Index.vue";
import VizDashboard from "@/views/VizDashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      path: "/",
      name: "Home",
      component: Index,
    },
    {
      path: "/visualize",
      name: "Visualizer",
      component: VizDashboard,
    },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;