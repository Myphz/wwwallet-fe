import { defineStore } from "pinia";
import { fetchServer } from "@/helpers/fetch.helper.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: null,
    transactions: null
  }),

  actions: {
    async login({ email, password }) {
      const res = await fetchServer("auth/login", { email, password });
      this.isAuthenticated = res.success && res.isVerified;
      if (res.success && !res.isVerified) return router.push({ name: "verify", params: { email, password } });
      return res;
    },

    async register({ email, password, resend }) {
      return await fetchServer("auth/register", { email, password, resend });
    },

    async checkAuth() {
      if (this.isAuthenticated) return true;
      if (this.isAuthenticated === false) return false;
      const { success } = await fetchServer("auth/verify");
      this.isAuthenticated = success;
      return success;
    },

    // Utility function that redirects to the login page if not logged in
    async redirect() {
      if (!await this.checkAuth()) return router.push({ name: "login", params: { redirect: router.currentRoute.value.path } });
    },

    // Transactions
    async addTransaction({ crypto, base, isBuy, price, quantity, date, notes }, emit) {
      const params = { crypto, base, isBuy, price, quantity, date, notes };
      const { success, id, msg } = await fetchServer("transactions", params);
      // Emit the data BEFORE rearraging the transactions, as that would cause a rerender, losing the emit
      emit("request", { success, msg });
      // Add the transaction if they have been previously fetched
      if (this.transactions && success) {
        if (crypto in this.transactions) {
          this.transactions[crypto].push({ _id: id, ...params});
        } else {
          this.transactions[crypto] = [{ _id: id, ...params}];
        }
      }

      return success;
    },

    async getTransactions() {
      if (this.isAuthenticated === false) return false;
      // If the transactions haven't been fetched
      if (!this.transactions) {
        const { success, transactions } = await fetchServer("transactions");
        if (!success) {
          this.isAuthenticated = false;
          return false
        };
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

      return success;
    },

    async deleteTransaction({ id, crypto }, emit) {
      const { success, msg } = await fetchServer("transactions", { id }, { method: "DELETE" });
      emit("request", { success, msg });
      if (!this.transactions || !success) return success;
      
      const i = this.transactions[crypto].findIndex(transaction => transaction._id === id);
      this.transactions[crypto].splice(i, 1);
      if (!this.transactions[crypto].length) delete this.transactions[crypto];
      return success;
    }
  }
});