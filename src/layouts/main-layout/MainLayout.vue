<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { LocalStorageKeysEnum } from 'src/enums/common/LocalStorageKeysEnum';
const $q = useQuasar();

onBeforeMount(() => {
  const isDark = !!localStorage.getItem(LocalStorageKeysEnum.DARK_MODE);
  $q.dark.set(isDark);
});
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
