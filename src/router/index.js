import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.mjs";
import { useAuthStore } from "S#/auth.store";

export default function createVueRouter(app) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
      // always scroll to top
      return { top: 0 }
    },
    routes
  });

  // Global route to check if the route is protected
  router.beforeEach(async to => {
    // Start progress bar
    app?.config?.globalProperties?.$Progress?.start();
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
  // Finish progress bar
  router.afterEach(() => app?.config?.globalProperties?.$Progress?.finish())

  return router;
};
