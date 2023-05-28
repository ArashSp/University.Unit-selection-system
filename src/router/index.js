import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

export { createRouter };

function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
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
    ],
  });
}
