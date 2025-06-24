<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { BotOriginsEnum } from 'src/enums/ai-trading/BotOriginsEnum';

interface IProps {
  origin: BotOriginsEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(origin) }}</span>
</template>

<i18n>
{
  "en": {
    "DEFAULT": "Default",
    "DEMO": "Demo"
  }
}
</i18n>
