import Vue from 'vue'
import Vuex from 'vuex'
import { ProductsService } from "../../../admin-portal/src/assets/js/ProductsService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryTree: [],
    products: [],
    errors: []
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
    },
    setProducts(state, payload) {
      state.products = payload.products;
    }
  },
  actions: {
    async updateTreeAndProducts ({ commit }, category) {
      console.log("Here")
      commit('addToTree', { category });
      // let products = await ProductsService.filterByCategories(state.categoryTree);
    },

    async populateProducts ({state}) {
      state.errors = [];
      try {
        state.commit('setProducts', {
          products: await ProductsService.findAll()
        });
      } catch (err) {
        state.errors.push(err.message);
      }
    }
  },
  modules: {
  }
})
