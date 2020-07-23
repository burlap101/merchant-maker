import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "./assets/bootstrap-scss/theme.scss";
// import "@fortawesome/fontawesome-free/css/all.css"; // upgraded to FA5 using kit code in index.html
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
