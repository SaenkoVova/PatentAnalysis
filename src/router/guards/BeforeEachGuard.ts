import type { _RouteRecordBase, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { signInLink } from 'src/utils/links';
import { useAuthStore } from 'stores/auth';

export const beforeEachGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.matched.some((record: _RouteRecordBase): unknown => record.meta?.requiresAuth)) {
    const auth = useAuthStore();
    if (!auth.getIsAuthorized) {
      next({
        path: signInLink(),
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
