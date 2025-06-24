<script lang="ts" setup>
import type { QDialogProps } from 'quasar';
import { useDialogPluginComponent } from 'quasar';

const props = defineProps<QDialogProps>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

defineExpose({
  onDialogOK,
  onDialogCancel,
});
</script>

<template>
  <q-dialog v-bind="props" ref="dialogRef" @hide="onDialogHide">
    <slot />
  </q-dialog>
</template>
