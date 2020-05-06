import Vue from "vue";
import Vuex from "vuex";
import { ShoppingCartService } from "../assets/js/ShoppingCartService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    trainingSessions: []
  },
  getters: {
    grandTotal: state => {
      let result = 0;
      for (let item of state.trainingSessions) {
        result += item.total_cost;
      }
      for (let item of state.products) {
        result += item.product.price * item.qty;
      }
      return result;
    },
    cartLength: state => {
      return state.products.length + state.trainingSessions.length;
    }
  },
  mutations: {
    increment (state, payload) {
      if (payload.type === "product") {
        let item = state.products.find((el => el.product._id == payload.id))
        item.product.qty++
      } else if (payload.type === "trainingSession") {
        state.trainingSessions.find(el => el.training_session.id)
      } else {
        throw Error("Incorrect payload type given, expected 'product' or 'trainingSession'");
      }
    },
    decrement (state, payload) {
      if (payload.type === "product") {
        let item = state.products.find((el => el.product._id == payload.id));
        item.qty--;
      } else if (payload.type === "trainingSession") {
        let item = state.trainingSessions.find(el => (el.training_session.id == payload.id));
        item.qty--;
      } else {
        throw Error("Incorrect payload type given, expected 'product' or 'trainingSession'");
      }
    },
    updateQty (state, payload) {
      if (payload.type === "product") {
        let item = state.products.find((el => el.product._id == payload.id));
        item.qty = payload.qty;
      } else if (payload.type === "trainingSession") {
        let item = state.trainingSessions.find(el => (el.training_session.id == payload.id));
        item.qty = payload.qty;
      } else {
        throw Error("Incorrect payload type given, expected 'product' or 'trainingSession'");
      }
    },
    addProducts (state, payload) {
      payload.items.forEach(e => state.products.push(e));
    }
  },
  actions: {
    async populateCart ({ commit, state }) {
      let products = (await ShoppingCartService.findMyCart()).items;
      state.products = [];
      commit('addProducts', {
        items: products
      })
    }
  },
  modules: {}
});
