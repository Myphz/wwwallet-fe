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

    async checkAuth() {
      if (this.isAuthenticated) return true;
      const { success } = await fetchServer("auth/verify");
      this.isAuthenticated = success;
      return success;
    },

    // Transactions
    async addTransaction({ crypto, base, isBuy, price, quantity, date, notes }) {
      const params = { crypto, base, isBuy, price, quantity, date, notes };
      const { success, id, msg } = await fetchServer("transactions", params);
      // Add the transaction if they have been previously fetched, otherwise don't bother
      if (Object.keys(this.transactions).length !== 0) {
        if (crypto in this.transactions) {
          this.transactions[crypto].push({ id, ...params});
        } else {
          this.transactions[crypto] = [{ id, ...params}];
        }
      }
      return { success, msg };
    },
  }
});