import Vue from 'vue'
import Vuex from 'vuex'
import { ProductsService } from "../../../admin-portal/src/assets/js/ProductsService";
import { CategoriesService } from "../assets/js/CategoriesService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryTree: [],
    categories: [],
    topeLevelCategories: [],
    products: [],
    errors: [],
    maxLevels: 1
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
      console.log(payload);
      state.products = payload.products;
    }
  },
  actions: {
    async updateTreeAndProducts ({ state, commit }, category) {
      commit('resetTree');
      commit('addToTree', { category });
      let hasParent = category.hasParent;
      let cat = category;
      while (hasParent) {
        let parent = state.categories.find(el => el.parent._id === cat._id);
        commit('addToTree', { parent });
        cat = parent;
      }
      let products = await ProductsService.filterByCategories(state.categoryTree);
      commit('setProducts', { products })
    },

    async populateProducts ({state, commit}) {
      state.errors = [];
      try {
        commit('setProducts', {
          products: await ProductsService.findAll()
        });
      } catch (err) {
        state.errors.push(err.message);
      }
    },

    async determineMaxLevels({state}) {
      let categories = await CategoriesService.findAll();
      state.maxLevels = Math.max.apply(Math, categories.map(function(cat) { return cat.level }))
    },

    async retrieveCategories({state}) {
      state.categories = await CategoriesService.findAll();
      state.maxLevels = Math.max.apply(Math, categories.map(function(cat) { return cat.level }));
      let topCats = [];
      for (let cat of state.categories) {
        this.$set(cat, 'expanded', true)
        if (!cat.hasParent) {
          topCats.push(cat);
        }
      }
      state.topLevelCategories = topCats;
    }

  },
  modules: {
  }
})
