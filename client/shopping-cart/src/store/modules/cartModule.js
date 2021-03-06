import { ShoppingCartService } from "../../assets/js/ShoppingCartService";

export const cartModule = {
  namespaced: true,
  state: () => ({
    products: [],
    trainingSessions: [],
    changedProducts: [],
    changedTrainingsessions: [],
    errors: []
  }),

  getters: {
    grandTotal(state) {
      let result = 0;
      for (let item of state.trainingSessions) {
        result += item.total_cost;
      }
      for (let item of state.products) {
        result += item.product.price * item.qty;
      }
      return result;
    },
    cartLength(state) {
      return state.products.length + state.trainingSessions.length;
    }
  },

  mutations: {
    increment(state, payload) {
      if (payload.type === "product") {
        let item = state.products.find(el => el.product._id == payload.id);
        item.qty++;
        if (!state.changedProducts.includes(payload.id)) {
          state.changedProducts.push(payload.id);
        }
      } else if (payload.type === "trainingSession") {
        let item = state.trainingSessions.find(
          el => el.training_session.id == payload.id
        );
        item.qty++;
      } else {
        throw Error(
          "Incorrect payload type given, expected 'product' or 'trainingSession'"
        );
      }
    },

    decrement(state, payload) {
      if (payload.type === "product") {
        let item = state.products.find(el => el.product._id == payload.id);
        item.qty--;
        if (!state.changedProducts.includes(payload.id)) {
          state.changedProducts.push(payload.id);
        }
      } else if (payload.type === "trainingSession") {
        let item = state.trainingSessions.find(
          el => el.training_session.id == payload.id
        );
        item.qty--;
      } else {
        throw Error(
          "Incorrect payload type given, expected 'product' or 'trainingSession'"
        );
      }
    },

    updateQty(state, payload) {
      if (payload.type === "product") {
        let item = state.products.find(el => el.product._id == payload.id);
        item.qty = payload.qty;
        if (!state.changedProducts.includes(payload.id)) {
          state.changedProducts.push(payload.id);
        }
      } else if (payload.type === "trainingSession") {
        let item = state.trainingSessions.find(
          el => el.training_session.id == payload.id
        );
        item.qty = payload.qty;
      } else {
        throw Error(
          "Incorrect payload type given, expected 'product' or 'trainingSession'"
        );
      }
    },

    addProducts(state, payload) {
      payload.items.forEach(item => {
        const index = state.products.findIndex(
          el => el.product._id === item.product._id
        );
        if (index < 0) {
          state.products.push(item);
        } else {
          state.products[index].qty = item.qty;
        }
      });
    }
  },

  actions: {
    async populateCart({ commit, state }) {
      let products = (await ShoppingCartService.findMyCart()).items;
      state.products = [];
      commit("addProducts", {
        items: products
      });
    },

    async saveCart({ state }) {
      for (let id of state.changedProducts) {
        let item = state.products.find(el => el.product._id == id);
        if (item.qty <= 0) {
          ShoppingCartService.removeItem(item);
          let itemIndex = state.products.indexOf(item);
          state.products.splice(itemIndex, 1);
        } else {
          ShoppingCartService.updateCartItem(item);
        }
      }
      state.changedProducts = [];
    },

    async addProductToCart({ state, commit }, payload) {
      const index = state.products.findIndex(
        el => el.product._id === payload.product._id
      );
      state.errors = [];
      try {
        if (index < 0) {
          ShoppingCartService.addToCart(payload);
        } else {
          ShoppingCartService.updateCartItem(payload);
        }
        commit("addProducts", {
          items: [payload]
        });
      } catch (err) {
        state.errors.push(err.message);
      }
    }
  }
};
