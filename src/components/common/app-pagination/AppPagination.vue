<script setup lang="ts">
import type { QPaginationProps } from 'quasar';

const props = withDefaults(defineProps<QPaginationProps>(), {
  maxPages: () => 6,
  boundaryNumbers: () => true,
  directionLinks: () => true,
  boundaryLinks: () => true,
  iconFirst: () => 'skip_previous',
  iconLast: () => 'skip_next',
  iconPrev: () => 'fast_rewind',
  iconNext: () => 'fast_forward',
});
</script>

<template>
  <q-pagination v-bind="props">
    <slot />
  </q-pagination>
</template>
