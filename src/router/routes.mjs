import { routeView } from "../helpers/route.helper.mjs";

export default [
  {
    path: "/",
    name: "homepage",
    // Don't render home on android
    component: () => import.meta.env.MODE !== "android" ? routeView("Home") : routeView("Dashboard"),
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
    path: "/feedback",
    name: "feedback",
    component: () => routeView("Feedback"),
    meta: { requiresAuth: true }
  },

  {
    path: "/privacypolicy",
    name: "Privacy Policy",
    component: () => import("../views/legal/PrivacyPolicy.view.vue")
  },

  {
    path: "/cookiepolicy",
    name: "Cookie Policy",
    component: () => import("../views/legal/CookiePolicy.view.vue")
  },
]