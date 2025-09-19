import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    component: () => import('@/layouts/defaultLayout.vue'),
    children: [
      {
        path: 'test',
        component: () => import('@/views/test/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
