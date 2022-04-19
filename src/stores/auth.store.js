import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    transactions: {}
  }),

  actions: {

  }
})