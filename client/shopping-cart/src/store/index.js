import Vue from "vue";
import Vuex from "vuex";
import { cartModule } from "./modules/cartModule";
import { customerModule } from "./modules/customerModule";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart: cartModule,
    customer: customerModule
  }
});
