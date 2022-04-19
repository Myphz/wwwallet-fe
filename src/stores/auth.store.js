import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    transactions: {}
  }),

  actions: {
    async login(event) {
      const data = Object.fromEntries(new FormData(event.target).entries());
      console.log(data);
      // const res = await fetchServer({ email, password });
      // console.log(res);
    },

    async register(event) {
      const data = Object.fromEntries(new FormData(event.target).entries());
      console.log(data);
      // const res = await fetchServer({ email, password });
      // console.log(res);
    }

  }
})