import Vue from 'vue'
import Vuex from 'vuex'
import { ProductService } from "../../../admin-portal/src/assets/js/ProductsService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryTree: [],
    products: []
  },
  mutations: {
    addToTree(state, payload) {
      state.categoryTree.push(payload.category);
    },
    pullFromTree(state, payload) {
      state.categoryTree.pop(payload.count);
    },
    resetTree(state) {
      state.categoryTree = [];
      state.products = [];
    }
  },
  actions: {
    updateTreeAndProducts ({ commit, state }, category) {
      commit('addToTree', { category });
      
    }
  },
  modules: {
  }
})
