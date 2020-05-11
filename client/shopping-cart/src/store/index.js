import Vue from "vue";
import Vuex from "vuex";
import { cartModule } from "./modules/cartModule";
import { customerModule } from "./modules/customerModule";
import { orderModule } from "./modules/orderModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart: cartModule,
    customer: customerModule,
    order: orderModule
  }
});
