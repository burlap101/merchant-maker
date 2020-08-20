import Vue from "vue";
import Vuex from "vuex";
import { shippingModule } from "./modules/shippingModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    shipping: shippingModule
  }
});
