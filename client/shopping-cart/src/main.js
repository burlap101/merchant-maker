import Vue from "vue";
import VueCookie from "vue-cookie";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "@stripe/stripe-js";

import "./assets/scss/theme.scss";
import "../../shopfront/src/assets/css/carousel.css";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
