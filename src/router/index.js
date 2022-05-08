import { createRouter, createWebHistory } from "vue-router"
import { routeView } from "../helpers/route.helper";
import { useAuthStore } from "S#/auth.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
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
    },

    {
      path: "/login",
      name: "login",
      component: () => routeView("Login"),
      meta: { noAuth: true }
    },

    {
      path: "/register",
      name: "register",
      component: () => routeView("Register"),
      meta: { noAuth: true }
    },

    {
      path: "/register/verify",
      name: "verify",
      component: () => routeView("RegisterVerify"),
      meta: { noAuth: true }
    },

    {
      path: "/confirm",
      name: "confirm",
      component: () => routeView("Confirm"),
    },

    {
      path: "/forgot",
      name: "forgot",
      component: () => routeView("Forgot"),
      meta: { noAuth: true }
    },

    {
      path: "/settings",
      name: "settings",
      component: () => routeView("UserSettings"),
      meta: { requiresAuth: true }
    },

    {
      path: "/privacypolicy",
      name: "Privacy Policy",
      component: () => import("../views/legal/PrivacyPolicy.view.vue")
    },

    {
      path: "/cookiepolicy",
      name: "Privacy Policy",
      component: () => import("../views/legal/CookiePolicy.view.vue")
    },
  ]
});

// Global route to check if the route is protected
router.beforeEach(async to => {
  const isAuth = await useAuthStore().checkAuth();
  to.params = { ...(to.params), isAuth };

  if (to.meta.requiresAuth) {
    if (!isAuth)
      return {
        name: "login",
        params: {
          redirect: to.path,
        }
      };
  }

  else if (to.meta.noAuth && isAuth) 
    return {
      name: "dashboard",
      params: { isAuth }
    };
});

export default router
