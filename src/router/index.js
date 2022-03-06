import { createRouter, createWebHistory } from "vue-router"
import routeResponsive from "../helpers/route.helper";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => routeResponsive("Home")
    },

    {
      path: "/crypto",
      name: "market",
      component: () => import("../views/Market.vue")
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue")
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue")
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue")
    },
  ]
});

export default router
