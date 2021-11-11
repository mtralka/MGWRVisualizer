import Dashboard from "@/views/Dashboard.vue";
import HelloWord from "@/views/HelloWorld.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      path: "/",
      name: "Hello Worlds",
      component: HelloWord,
    },
    {
      path: "/visualize",
      name: "Visualize",
      component: Dashboard,
    },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;