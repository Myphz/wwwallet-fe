import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    transactions: {}
  }),

  actions: {
    async login({ email, password }) {
      const res = await fetchServer("auth/login", { email, password });
      this.isAuthenticated = res.success;
      return res;
    },

    async register({ email, password }) {
      const res = await fetchServer("auth/register", { email, password });
      this.isAuthenticated = res.success;
      return res;
    },
  }
});