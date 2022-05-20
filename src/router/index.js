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


  // Global route to block navigation if the route requirement is not fulfilled
  router.beforeEach(async to => {
    // Start progress bar
    app?.config?.globalProperties?.$Progress?.start();
    // Set default isAuth
    const store = useAuthStore();
    to.params = { ...(to.params), isAuth: store.isAuthenticated };
    // If there are no special requirements for the route, just return
    if (!to.meta.requiresAuth && !to.meta.noAuth) return;
    const isAuth = await store.checkAuth();
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

  // Global route to add isAuth parameter
  router.beforeResolve(async to => {
    // If the requiresAuth or noAuth meta property is set, the isAuth parameter is already checked in the previous route
    if (to.meta.requiresAuth || to.meta.noAuth) return;
    const isAuth = await useAuthStore().checkAuth();
    to.params = { ...(to.params), isAuth };
  });
  
  // Finish progress bar
  router.afterEach(() => app?.config?.globalProperties?.$Progress?.finish())

  return router;
};
