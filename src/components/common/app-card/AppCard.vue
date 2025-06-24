<script setup lang="ts">
import type { QCardProps } from 'quasar';
import { useQuasar } from 'quasar';

const props = withDefaults(defineProps<QCardProps>(), {
  flat: () => true,
  bordered: () => true,
});

const $q = useQuasar();
</script>
<template>
  <q-card v-bind="props" :dark="$q.dark.isActive">
    <slot />
  </q-card>
</template>
