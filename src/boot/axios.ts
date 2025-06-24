import { boot } from 'quasar/wrappers';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { RouteNamesEnum } from 'src/enums/common/RouteNamesEnum';
import { maintenanceLink } from 'src/utils/links';
import type { ILoginResponse } from 'src/types/user-profile/ILoginResponse';
import { LocalStorageKeysEnum } from 'src/enums/common/LocalStorageKeysEnum';
import { refreshToken } from 'src/api/user-profile/AdminAuthApi';
import { useAuthStore } from 'stores/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const http = axios.create({ baseURL: process.env.API_URL as string });

let refreshTokenPromise: null | Promise<ILoginResponse> = null;

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  http.interceptors.response.use(
    (response) => response,
    async (axiosError) => {
      if (axiosError.code === 'ERR_NETWORK') {
        if (router.currentRoute.value.name !== RouteNamesEnum.MAINTENANCE) {
          await router.push(maintenanceLink());
        }
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(axiosError);
      }

      const originalRequest = axiosError.config;

      if (!originalRequest) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(axiosError);
      }

      const status = axiosError.response?.status;

      if (status === 403 || status === 401) {
        if (!refreshTokenPromise) {
          const token = localStorage.getItem(LocalStorageKeysEnum.REFRESH_TOKEN);

          const deviceId = localStorage.getItem(LocalStorageKeysEnum.DEVICE_ID);

          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (!token || !deviceId) return Promise.reject(axiosError);

          refreshTokenPromise = refreshToken({
            refreshToken: token,
            deviceId,
          });
        }

        try {
          const response = await refreshTokenPromise;
          localStorage.setItem(LocalStorageKeysEnum.ACCESS_TOKEN, response.accessToken);
          localStorage.setItem(LocalStorageKeysEnum.REFRESH_TOKEN, response.refreshToken);
          return http.request(originalRequest);
        } catch {
          const authStore = useAuthStore();
          await authStore.logOut();
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          return Promise.reject(axiosError);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(axiosError);
      }
    },
  );

  http.interceptors.request.use((config) => {
    const token = localStorage.getItem(LocalStorageKeysEnum.ACCESS_TOKEN);

    if (!token) {
      config.headers.Authorization = null;
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = http;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { http };
