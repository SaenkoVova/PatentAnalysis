<script setup lang="ts">
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import { useI18n } from 'vue-i18n';

interface IProps {
  botType: BotTypesEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(botType) }}</span>
</template>

<i18n>
{
  "en": {
    "START": "Scalping",
    "BASE": "Futures Pro",
    "PRO": "Futures"
  }
}
</i18n>
