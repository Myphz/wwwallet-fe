import { createRouter, createWebHistory } from "vue-router"
import { routeView } from "../helpers/route.helper";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => routeView("Home")
    },

    {
      path: "/wallet",
      name: "wallet",
      component: () => routeView("Wallet")
    },

    {
      path: "/crypto",
      name: "market",
      component: () => routeView("Market")
    },

    {
      path: "/crypto/:crypto",
      name: "crypto",
      component: () => routeView("Crypto")
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.view.vue")
    },

    {
      path: "/login",
      name: "login",
      component: () => routeView("Login")
    },

    {
      path: "/register",
      name: "register",
      component: () => routeView("Register")
    },
  ]
});

export default router
