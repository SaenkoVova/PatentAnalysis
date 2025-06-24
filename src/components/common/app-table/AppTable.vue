<script setup lang="ts">
import type { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';
import { useSlots } from 'vue';

const props = withDefaults(defineProps<QTableProps>(), {
  flat: () => true,
  hidePagination: () => true,
  hideBottom: () => true,
  separator: () => 'cell',
  rowsPerPageOptions: () => [0],
  bordered: () => true,
});

const $q = useQuasar();

const slots = useSlots();
</script>

<template>
  <q-table v-bind="props" class="table" :dark="$q.dark.isActive">
    <template v-for="(slot, idx) in Object.keys(slots)" :key="idx" #[`${slot}`]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </q-table>
</template>

<style scoped lang="scss">
@import 'app-table';
</style>
