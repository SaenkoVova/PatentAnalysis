<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { BotStatusesEnum } from 'src/enums/ai-trading/BotStatusesEnum';

interface IProps {
  status: BotStatusesEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(status) }}</span>
</template>

<i18n>
{
  "en": {
    "ACTIVE": "Active",
    "PENDING": "Pending",
    "LIQUIDATED": "Liquidated",
    "CLOSED": "Closed"
  }
}
</i18n>
