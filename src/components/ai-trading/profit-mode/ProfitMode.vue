<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ProfitModesEnum } from 'src/enums/ai-trading/ProfitModesEnum';

interface IProps {
  mode: ProfitModesEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(mode) }}</span>
</template>

<i18n>
{
  "en": {
    "DEFAULT": "Default",
    "PERSONAL": "Personal",
  }
}
</i18n>
