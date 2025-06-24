<script setup lang="ts">
import type { QSelectProps } from 'quasar';
import { useQuasar } from 'quasar';

interface IProps extends QSelectProps {
  flat?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  outlined: () => true,
  dense: () => true,
  flat: () => true,
  behavior: () => 'menu',
});
const $q = useQuasar();
</script>

<template>
  <q-select
    class="select"
    v-bind="props"
    :dark="$q.dark.isActive"
    :popup-content-style="flat ? { boxShadow: 'none' } : {}"
    :options-dark="$q.dark.isActive"
  >
    <template #selected>
      <slot name="selected">
        <span class="text-bold">{{ props.modelValue }}</span>
      </slot>
    </template>
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label class="text-bold">{{ scope.opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </slot>
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
  </q-select>
</template>

<style scoped lang="scss">
@import 'app-select';
</style>
