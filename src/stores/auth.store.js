import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    transactions: {}
  }),

  actions: {
    async login(data) {
      console.log(data);
      // const res = await fetchServer({ email, password });
      // console.log(res);
    },

    async register(data) {
      console.log(data);
      // const res = await fetchServer({ email, password });
      // console.log(res);
    }

  }
})