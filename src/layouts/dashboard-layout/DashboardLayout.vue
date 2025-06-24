<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppNav from 'components/common/app-nav/AppNav.vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'stores/auth';
import { ref } from 'vue';
import { LocalStorageKeysEnum } from 'src/enums/common/LocalStorageKeysEnum';
// import { useQuery } from '@tanstack/vue-query';
// import { getUserAvatar, getUserInfo } from 'src/api/user-profile/UserInfoApi';
import DefaultUserSvg from 'assets/svg/default-user.svg';
import Logo from 'assets/svg/logo.svg';

const route = useRoute();
const { t } = useI18n();
const $q = useQuasar();
const authStore = useAuthStore();
const isVisible = ref(!$q.screen.xs && !$q.screen.sm);
const miniState = ref(true);

// const { data: userInfo } = useQuery({
//   queryKey: ['get-user-profile'],
//   queryFn: getUserInfo,
//   refetchOnMount: false,
//   refetchOnReconnect: false,
//   refetchOnWindowFocus: false,
// });

// const { data: userAvatar } = useQuery({
//   queryKey: ['get-user-profile-avatar'],
//   queryFn: getUserAvatar,
//   refetchOnMount: false,
//   refetchOnReconnect: false,
//   refetchOnWindowFocus: false,
// });

const onThemeToggleClick = ($event: boolean) => {
  $q.dark.set($event);
  if ($event) {
    localStorage.setItem(LocalStorageKeysEnum.DARK_MODE, 'true');
  } else {
    localStorage.removeItem(LocalStorageKeysEnum.DARK_MODE);
  }
};

const onLogoutClick = async () => {
  await authStore.logOut();
};
</script>

<template>
  <q-layout view="hHh LpR lFf" class="layout">
    <q-header reveal>
      <q-toolbar class="flex items-center">
        <q-img style="max-width: 100px; max-height: 100px" class="q-mr-md" :src="Logo" fit="contain">
          <template #loading>
            <q-skeleton width="100px" height="100px" type="QChip" animation="fade" />
          </template>
        </q-img>
        <q-separator class="bg-white" vertical />
        <q-toolbar-title class="layout__title">
          <q-btn
            v-if="$q.screen.xs || $q.screen.sm"
            class="layout__burger-btn"
            icon="widgets"
            flat
            round
            dense
            @click="isVisible = !isVisible"
          />
          {{ t(route.name?.toString() || '') }}
        </q-toolbar-title>
        <q-space />
        <q-btn class="text-white" no-wrap flat no-caps color="primary">
          {{ 'example@mail.com' }}
          <q-avatar class="q-ml-sm">
            <q-img :src="DefaultUserSvg" />
          </q-avatar>
          <q-menu fit anchor="bottom left" self="top left" style="box-shadow: none">
            <q-list separator style="box-shadow: none">
              <q-item>
                <div class="full-width flex justify-center items-center">
                  <q-icon
                    :class="{ disabled: $q.dark.isActive }"
                    color="primary"
                    name="light_mode"
                    size="sm"
                  />
                  <q-toggle
                    icon-color="primary"
                    :keep-color="true"
                    :model-value="$q.dark.isActive"
                    size="sm"
                    color="primary"
                    @update:model-value="onThemeToggleClick"
                  />
                  <q-icon
                    :class="{ disabled: !$q.dark.isActive }"
                    color="primary"
                    name="dark_mode"
                    size="sm"
                  />
                </div>
              </q-item>
              <q-item class="no-padding">
                <q-btn
                  class="full-width"
                  icon="logout"
                  color="primary"
                  @click="onLogoutClick"
                  flat
                  :label="t('logOut')"
                  no-caps
                  no-wrap
                />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isVisible"
      mini-to-overlay
      :mini="miniState"
      :width="230"
      show-if-above
      side="left"
      bordered
    >
      <q-btn
        class="absolute"
        :icon="miniState ? 'arrow_circle_right' : 'arrow_circle_left'"
        v-if="!$q.screen.xs && !$q.screen.sm"
        flat
        round
        size="md"
        style="right: -15px; top: 10px"
        color="primary"
        dense
        @click="miniState = !miniState"
      />
      <app-nav :show-tooltip="miniState" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-toolbar>
        <q-space />
        <p :class="{ 'text-black': !$q.dark.isActive }">Powered by Vodalend</p>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
@import 'dashboard-layout';
</style>

<i18n>
{
  "uk": {
    "Patents": "Патенти"
  }
}
</i18n>
