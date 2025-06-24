<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

interface IProps {
  algorithm: AlgorithmTunesEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(algorithm) }}</span>
</template>

<i18n>
{
  "en": {
    "STARTER": "Starter",
    "STABLE": "Stable",
    "BALANCED": "Balanced",
    "INTENSE": "Intense"
  }
}
</i18n>
