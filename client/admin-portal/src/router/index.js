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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
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
        component: () => import("../views/children/Products.vue")
      },
      {
        path: "orders",
        component: () => import("../views/children/Orders.vue")
      },
      {
        path: "products/add",
        component: () => import("../views/children/ProductsAdd.vue")
      },
      {
        path: "products/edit/:id",
        component: () => import("../views/children/ProductsEdit.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (from.path.startsWith("/store")) {
    next("/store" + to.path);
  } else {
    next();
  }
});

export default router;
