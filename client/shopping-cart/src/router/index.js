import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Checkout from "../views/children/Checkout.vue";
import ShoppingCart from "../views/children/ShoppingCart.vue";
import PaymentSuccess from "../views/children/PaymentSuccess.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "checkout",
        component: Checkout
      },
      {
        path: "shopping-cart",
        component: ShoppingCart
      },
      {
        path: "payment-success",
        component: PaymentSuccess
      }
    ]
  }
  //   {
  //     path: "/about",
  //     name: "About",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () =>
  //       import(/* webpackChunkName: "about" */ "../views/About.vue")
  //   }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
