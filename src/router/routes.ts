import type { RouteRecordRaw } from 'vue-router';
import { RoutePathsEnum } from 'src/enums/common/RoutePathsEnum';
import { RouteNamesEnum } from 'src/enums/common/RouteNamesEnum';
import { authGuard } from 'src/router/guards/AuthGuard';

export const routes: RouteRecordRaw[] = [
  {
    name: RouteNamesEnum.MAIN_LAYOUT,
    path: RoutePathsEnum.ROOT,
    component: () => import(/*main-layout*/ 'layouts/main-layout/MainLayout.vue'),
    children: [
      {
        name: RouteNamesEnum.DASHBOARD_LAYOUT,
        path: RoutePathsEnum.EMPTY,
        redirect: RoutePathsEnum.PATENTS,
        component: () =>
          import(/*dashboard-layout*/ 'layouts/dashboard-layout/DashboardLayout.vue'),
        children: [
          {
            name: RouteNamesEnum.PATENTS,
            path: RoutePathsEnum.PATENTS,
            component: () => import(/*patents-page*/ 'pages/patents-page/PatentsPage.vue'),
            meta: {
              requiresAuth: true,
            }
          },
        ],
      },
      {
        name: RouteNamesEnum.SIGN_IN,
        path: RoutePathsEnum.SIGN_IN,
        beforeEnter: authGuard,
        component: () => import(/*sign-in-page*/ 'pages/sign-in-page/SignInPage.vue'),
      },
      {
        name: RouteNamesEnum.MAINTENANCE,
        path: RoutePathsEnum.MAINTENANCE,
        component: () => import(/*maintenance-page*/ 'pages/maintenance-page/MaintenancePage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import(/*error-not-found*/ 'pages/ErrorNotFound.vue'),
  },
];
