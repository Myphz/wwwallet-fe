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
    async addTransaction({ crypto, base, isBuy, price, quantity, date, notes }, emit) {
      const params = { crypto, base, isBuy, price, quantity, date, notes };
      const { success, id, msg } = await fetchServer("transactions", params);
      // Emit the data BEFORE rearraging the transactions, as that would cause a rerender, losing the emit
      emit("request", { success, msg });
      // Add the transaction if they have been previously fetched, otherwise don't bother
      if (this.transactions && success) {
        if (crypto in this.transactions) {
          this.transactions[crypto].push({ id, ...params});
        } else {
          this.transactions[crypto] = [{ id, ...params}];
        }
      }
      return success;
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

    async updateTransaction({ id, oldCrypto, crypto, base, isBuy, price, quantity, date, notes }, emit) {
      const params = { id, crypto, base, isBuy, price, quantity, date, notes };
      const { success, newId, msg } = await fetchServer("transactions", params, { method: "PUT" });
      // Emit the data BEFORE rearraging the transactions, as that would cause a rerender, losing the emit
      emit("request", { success, msg });
      // Add the transaction if they have been previously fetched, otherwise don't bother
      if (!this.transactions || !success) return success;
      // Update existing transactions
      let i = this.transactions[oldCrypto].findIndex(transaction => transaction._id === id);
      if (oldCrypto !== crypto) {
        this.transactions[oldCrypto].splice(i, 1);

        if (!this.transactions[oldCrypto].length) delete this.transactions[oldCrypto];
        if (!this.transactions[crypto]) this.transactions[crypto] = [];

        this.transactions[crypto].push({ _id: newId, oldCrypto, crypto, base, isBuy, price, quantity, date, ...(notes && { notes}) });
        i = this.transactions[crypto].length - 1;
      } else {
        this.transactions[crypto][i] = { _id: newId, oldCrypto, crypto, base, isBuy, price, quantity, date, ...(notes && { notes}) }
      };

      return msg;
    },
  }
});