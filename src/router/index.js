import { createRouter, createWebHistory } from "vue-router"
import { routeView } from "../helpers/route.helper";
import { useAuthStore } from "S#/auth.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => routeView("Home"),
    },

    {
      path: "/wallet",
      name: "wallet",
      component: () => routeView("Wallet"),
      meta: { requiresAuth: true }
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
      component: () => routeView("Dashboard"),
      meta: { requiresAuth: true }
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

    {
      path: "/settings",
      name: "settings",
      component: () => routeView("UserSettings"),
      meta: { requiresAuth: true }
    },
  ]
});

// Global route to check if the route is protected
router.beforeEach(async to => {
  if (to.meta.requiresAuth) {
    const store = useAuthStore();
    const isAuth = await store.checkAuth();
    if (isAuth) return true;
    return {
      name: "login",
      params: {
        redirect: to.path,
      }
    };
  }
});

export default router
