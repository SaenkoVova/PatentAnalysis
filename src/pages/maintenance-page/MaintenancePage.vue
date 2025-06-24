<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import { getUserInfo } from 'src/api/user-profile/UserInfoApi';
import { useRouter } from 'vue-router';
import { homeLink } from 'src/utils/links';

const { t } = useI18n();
const router = useRouter();

useQuery({
  queryKey: ['get-user-profile-ksljd'],
  queryFn: async () => {
    const response = getUserInfo();
    await router.push(homeLink());
    return response;
  },
  refetchInterval: 10000,
});
</script>

<template>
  <q-page class="flex items-center justify-center column">
    <h1 class="block q-mb-md">{{ t('maintenanceTime') }}</h1>
    <q-btn color="primary" outline :label="t('home')" :to="homeLink()" />
  </q-page>
</template>

<i18n>
{
  "en": {
    "maintenanceTime": "Maintenance time"
  }
}
</i18n>
