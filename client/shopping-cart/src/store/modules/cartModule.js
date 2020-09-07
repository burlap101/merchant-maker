import { ShoppingCartService } from "../../assets/js/ShoppingCartService";
import { TrainingShoppingCartService } from "../../assets/js/TrainingShoppingCartService";

export const cartModule = {
  namespaced: true,
  state: () => ({
    products: [],
    trainingSessions: [],
    changedProducts: [],
    changedTrainingsessions: [],
    clientSecret: "",
    errors: []
  }),

  getters: {
    grandTotal(state) {
      let result = 0;
      for (let item of state.trainingSessions) {
        result += item.qty * item.unit_price;
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
        let item = state.trainingSessions.find(el => el.pk == payload.id);
        item.qty++;
        if (!state.changedTrainingsessions.includes(payload.id)) {
          state.changedTrainingsessions.push(payload.id);
        }
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
        let item = state.trainingSessions.find(el => el.pk == payload.id);
        item.qty--;
        if (!state.changedTrainingsessions.includes(payload.id)) {
          state.changedTrainingsessions.push(payload.id);
        }
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
        let item = state.trainingSessions.find(el => el.pk == payload.id);
        item.qty = payload.qty;
        if (!state.changedTrainingsessions.includes(payload.id)) {
          state.changedTrainingsessions.push(payload.id);
        }
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
    },

    addTrainingSessions(state, payload) {
      payload.items.forEach(item => {
        const index = state.trainingSessions.findIndex(el => el.pk === item.pk);
        if (index < 0) {
          state.trainingSessions.push(item);
        } else {
          state.trainingSessions[index].qty = item.qty;
        }
      });
    }
  },

  actions: {
    async populateCart({ commit, state, dispatch }) {
      try {
        let products = (await ShoppingCartService.findMyCart()).items;
        state.products = [];
        commit("addProducts", {
          items: products
        });
      } catch (err) {
        state.errors.push(err.message);
      }

      try {
        let mmTsCart = (await ShoppingCartService.findMyCart()).tsItems;
        let trainingCart = await TrainingShoppingCartService.getShoppingCart();

        for (let item of trainingCart) {
          if (!mmTsCart.includes(item) || mmTsCart.length === 0) {
            await ShoppingCartService.addTsToCart(item);
          }
        }

        state.trainingSessions = [];
        commit("addTrainingSessions", {
          items: trainingCart
        });
      } catch (err) {
        state.errors.push("TrainingCart: " + err.message);
      }

      if (!state.clientSecret) {
        dispatch("setClientSecret");
      }
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

      for (let id of state.changedTrainingsessions) {
        let item = state.trainingSessions.find(el => el.pk === id);
        if (item.qty <= 0) {
          TrainingShoppingCartService.delete(item.pk);
          ShoppingCartService.removeTsItem(item);
          let itemIndex = state.trainingSessions.indexOf(item);
          state.trainingSessions.splice(itemIndex, 1);
        } else {
          TrainingShoppingCartService.update(item);
          ShoppingCartService.updateCartTsItem(item);
        }
      }
      state.changedTrainingsessions = [];
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
    },

    async setClientSecret({ state }) {
      if (state.clientSecret === "") {
        state.clientSecret = (
          await ShoppingCartService.paymentIntentSecret()
        ).secret;
      }
    },

    async deleteTrainingCartItem({ state }, payload) {
      console.log("Delete cart called with payload:", payload);
      try {
        await TrainingShoppingCartService.delete(payload.pk);
        await ShoppingCartService.removeTsItem(payload);
        let ts = state.trainingSessions.find(el => el.pk === payload.pk);
        let deleteIndex = state.trainingSessions.indexOf(ts);
        state.trainingSessions.splice(deleteIndex, 1);
      } catch (err) {
        state.errors.push(err.message);
      }
    },

    async deleteTrainingCart({ state, dispatch }) {
      for (const ts of state.trainingSessions) {
        await dispatch("deleteTrainingCartItem", ts);
      }
    }
  }
};
