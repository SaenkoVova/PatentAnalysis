<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useAuthStore } from 'stores/auth';
import { watch } from 'vue';

const queryClient = useQueryClient();
const authStore = useAuthStore();

watch(
  () => authStore.getIsAuthorized,
  async (value) => {
    if (!value) {
      await queryClient.resetQueries();
    }
  },
);
</script>

<template>
  <router-view />
</template>
