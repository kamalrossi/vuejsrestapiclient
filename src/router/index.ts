import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("../components/TutorialsList.vue")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("../components/Tutorial.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddTutorial.vue")
  },
  {
    path: "/",
    alias: "/orders",
    name: "orders",
    component: () => import("../components/OrdersList.vue")
  },
  {
    path: "/orders/:id",
    name: "order-details",
    component: () => import("../components/Order.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddOrder.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
