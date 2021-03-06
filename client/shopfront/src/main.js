import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

import "./assets/scss/theme.scss";
import "./assets/css/carousel.css";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
