<script setup lang="ts">
import type { QCardSectionProps } from 'quasar';
import { useQuasar } from 'quasar';

const props = withDefaults(defineProps<QCardSectionProps>(), {});

const $q = useQuasar();
</script>
<template>
  <q-card-section v-bind="props" :dark="$q.dark.isActive">
    <slot />
  </q-card-section>
</template>
