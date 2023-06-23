import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

export { createRouter };

function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
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
    ],
  });
}
