import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/index/index.page.vue"),
  },
  {
    path: "/Selection",
    component: () => import("@/pages/Selection/index.page.vue"),
  },
  {
    path: "/Preview",
    component: () => import("@/pages/Preview/index.page.vue"),
  },
];

const router = createRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: routes,
});

export default router;
