import Vue from 'vue'
import Vuex from 'vuex'
import { ProductsService } from "../../../admin-portal/src/assets/js/ProductsService";

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
    async updateTreeAndProducts ({ commit, state }, category) {
      commit('addToTree', { category });
      state.products = await ProductsService.filterByCategories(state.categoryTree);
    }
  },
  modules: {
  }
})
