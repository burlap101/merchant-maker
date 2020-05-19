import { ShoppingCartService } from "../../assets/js/ShoppingCartService";

export const cartModule = {
  namespaced: true,
  state: () => ({
    products: [],
    trainingSessions: [],
    changedProducts: [],
    changedTrainingsessions: []
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
      payload.items.forEach(e => state.products.push(e));
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
    }
  }
};
