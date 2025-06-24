<script setup lang="ts">
import { buildExplorerLink, isSystemTx } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';
import { useAddressShortener } from 'src/composable/useAddressShortener';

interface IProps {
  address: string;
  network: string;
}

defineProps<IProps>();

const { t } = useI18n();
</script>

<template>
  <div>
    <span v-if="isSystemTx(network)"> {{ t('system') }}</span>
    <a
      v-else
      :href="buildExplorerLink('address', address, network)"
      target="_blank"
      >{{ useAddressShortener(address) }}</a
    >
  </div>
</template>

<i18n>
{
  "en": {
    "system": "System"
  }
}
</i18n>
