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
      if (this.isAuthenticated) await this.getTransactions();
      if (res.success && !res.isVerified) return router.push({ name: "verify", params: { email, password } });
      return res;
    },

    async register({ email, password, resend }) {
      return await fetchServer("auth/register", { email, password, resend });
    },

    async verify(jwt) {
      const res = await fetchServer("auth/register/verify", { jwt });
      this.isAuthenticated = res.success;
      this.transactions = {};
      return res;
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

      if (success) {
        if (!this.transactions) this.transactions = {};
        if (crypto in this.transactions) {
          this.transactions[crypto].push({ _id: id, ...params});
        } else {
          this.transactions[crypto] = [{ _id: id, ...params}];
        }
      }

      return success;
    },

    async getTransactions() {
      if (this.isAuthenticated === false) return null;
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
      if (!success) return success;
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
      if (!success) return success;
      
      const i = this.transactions[crypto].findIndex(transaction => transaction._id === id);
      this.transactions[crypto].splice(i, 1);
      if (!this.transactions[crypto].length) delete this.transactions[crypto];
      return success;
    },

    async logout() {
      await fetchServer("auth/login", null, { method: "DELETE" });
      this.isAuthenticated = false;
      this.transactions = null;
      router.push("/login");
    },

    // Advanced
    async changeEmailRequest(email) {
      return await fetchServer("account/update", { email });
    },

    async changePasswordRequest() {
      return await fetchServer("account/update", null, { method: "POST" });
    },

    async deleteTransactions() {
      const ret = await fetchServer("account/delete/transactions", null, { method: "DELETE" });
      if (ret.success) this.transactions = {};
      return ret;
    },

    async deleteAccountRequest() {
      return await fetchServer("account/delete", null, { method: "POST" });
    },

    async changeEmail(jwt) {
      return await fetchServer("account/update", { jwt }, { method: "PUT" });
    },

    async changePassword(jwt, password) {
      return await fetchServer("account/update", { jwt, password }, { method: "PUT" });
    },

    async deleteAccount(jwt) {
      const ret = await fetchServer(`account/delete?jwt=${jwt}`, null, { method: "DELETE" });
      this.isAuthenticated = false;
      return ret;
    },

    async forgotPassword(email) {
      return await fetchServer("account/forgot", { email });
    },

    async feedback(text) {
      return await fetchServer("account/feedback", { msg: text })
    }
  }
});