<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { WithdrawalEligibilitiesEnum } from 'src/enums/ai-trading/WithdrawalEligibilitiesEnum';

interface IProps {
  eligibility: WithdrawalEligibilitiesEnum;
}

defineProps<IProps>();
const { t } = useI18n();
</script>

<template>
  <span>{{ t(eligibility) }}</span>
</template>

<i18n>
{
  "en": {
    "ACTIVE": "Active",
    "BLOCKED": "Blocked",
  }
}
</i18n>
