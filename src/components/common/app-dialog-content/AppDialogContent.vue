<script setup lang="ts">
import type { QCardProps } from 'quasar';
import { useQuasar } from 'quasar';

const props = withDefaults(defineProps<QCardProps>(), {
  bordered: () => true,
  flat: () => true,
});

const $q = useQuasar();
</script>
<template>
  <q-card v-bind="props" :dark="$q.dark.isActive" class="q-dialog-plugin">
    <slot />
  </q-card>
</template>
