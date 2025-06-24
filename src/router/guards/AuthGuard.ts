import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { RoutePathsEnum } from 'src/enums/common/RoutePathsEnum';
import { useAuthStore } from 'stores/auth';

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  if (authStore.getIsAuthorized) {
    next({
      path: RoutePathsEnum.ROOT,
    });
  } else {
    next();
  }
};
