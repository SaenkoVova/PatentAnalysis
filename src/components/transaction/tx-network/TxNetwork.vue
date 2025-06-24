<script setup lang="ts">
import { computed } from 'vue';
import { isAccountTx, isSystemTx } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';

interface IProps {
  hash: string;
  network: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const text = computed(() => {
  if (isAccountTx(props.hash)) return 'userAccount';
  if (isSystemTx(props.network)) return 'systemNetwork';
  return props.network;
});
</script>

<template>
  <span>{{ t(text) }}</span>
</template>

<i18n>
{
  "en": {
    "userAccount": "User account",
    "systemNetwork": "System network",
  }
}
</i18n>
