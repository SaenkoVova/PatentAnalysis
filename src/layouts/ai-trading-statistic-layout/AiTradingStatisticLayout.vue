<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  aiTradingBotsStatisticLink,
  aiTradingBotsStatisticWithdrawLink,
} from 'src/utils/links';

const { t } = useI18n();

const tabs = [
  {
    label: 'general',
    to: aiTradingBotsStatisticLink(),
    icon: 'apps',
  },
  {
    label: 'withdraw',
    to: aiTradingBotsStatisticWithdrawLink(),
    icon: 'credit_card',
  },
];
</script>

<template>
  <div>
    <q-tabs class="q-mb-sm" active-color="primary" inline-label align="left">
      <q-route-tab
        no-caps
        v-for="(item, idx) in tabs"
        :key="idx"
        :label="t(item.label)"
        :to="item.to"
        :icon="item.icon"
        :exact="false"
      />
    </q-tabs>

    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "general": "General",
    "withdraw": "Withdraw"
  }
}
</i18n>
