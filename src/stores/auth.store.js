import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    transactions: null
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

    // Utility function that gets called to open the 'Add Transaciton' Popup
    async openPopup() {
      if (!await this.checkAuth()) { 
        return router.push({ name: "login", params: { redirect: router.currentRoute.value.path } });
      }
      window.scrollTo({top: 0, behavior: "smooth"});
    },

    // Transactions
    async addTransaction({ crypto, base, isBuy, price, quantity, date, notes }) {
      const params = { crypto, base, isBuy, price, quantity, date, notes };
      const { success, id, msg } = await fetchServer("transactions", params);
      // Add the transaction if they have been previously fetched, otherwise don't bother
      if (this.transactions && success) {
        if (crypto in this.transactions) {
          this.transactions[crypto].push({ id, ...params});
        } else {
          this.transactions[crypto] = [{ id, ...params}];
        }
      }
      return { success, msg };
    },

    async getTransactions() {
      // If the transactions haven't been fetched
      if (!this.transactions) {
        const { success, transactions } = await fetchServer("transactions");
        if (!success) return false;
        this.transactions = transactions;
      }
      // If the request didn't fail, you are authenticated
      this.isAuthenticated = true;
      return true;
    },
  }
});