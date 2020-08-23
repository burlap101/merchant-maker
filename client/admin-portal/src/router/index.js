import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("../views/children/products/Overview.vue")
      },
      {
        path: "products/add",
        component: () => import("../views/children/products/Add.vue")
      },
      {
        path: "products/edit/:id",
        component: () => import("../views/children/products/Edit.vue")
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("../views/children/orders/Overview.vue")
      },
      {
        path: "orders/edit/:id",
        component: () => import("../views/children/orders/Edit.vue")
      },
      {
        path: "shipping",
        name: "shipping",
        component: () => import("../views/children/shipping/Overview.vue")
      },
      {
        path: "shipping/add",
        component: () => import("../views/children/shipping/Add.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
