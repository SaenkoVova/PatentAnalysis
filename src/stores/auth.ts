import { defineStore } from 'pinia';
import { signInLink } from 'src/utils/links';
import type { ILoginResponse } from 'src/types/user-profile/ILoginResponse';
import { LocalStorageKeysEnum } from 'src/enums/common/LocalStorageKeysEnum';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthorized: !!window.localStorage.getItem(
      LocalStorageKeysEnum.ACCESS_TOKEN
    ),
  }),

  getters: {
    getIsAuthorized: (state): boolean => state.isAuthorized,
  },

  actions: {
    setIsAuthorized(val: ILoginResponse) {
      localStorage.setItem(LocalStorageKeysEnum.ACCESS_TOKEN, val.accessToken);
      localStorage.setItem(
        LocalStorageKeysEnum.REFRESH_TOKEN,
        val.refreshToken
      );
      this.isAuthorized = true;
    },

    async logOut() {
      localStorage.removeItem(LocalStorageKeysEnum.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageKeysEnum.REFRESH_TOKEN);
      this.isAuthorized = false;
      await this.router.push(signInLink());
    },
  },
});
