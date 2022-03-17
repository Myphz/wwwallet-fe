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
      component: () => routeResponsive("Market")
    },

    {
      path: "/crypto/:crypto",
      name: "crypto",
      component: () => routeResponsive("Crypto")
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue")
    },

    {
      path: "/login",
      name: "login",
      component: () => routeResponsive("Login")
    },

    {
      path: "/register",
      name: "register",
      component: () => routeResponsive("Register")
    },
  ]
});

export default router
