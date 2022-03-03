import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => import("../views/HomeView.vue")
    },

    {
      path: "/crypto",
      name: "market",
      component: () => import("../views/MarketView.vue")
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue")
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue")
    },
  ]
});

export default router
