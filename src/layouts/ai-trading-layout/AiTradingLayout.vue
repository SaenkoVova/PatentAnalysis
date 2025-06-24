<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  aiTradingActiveBotsLink,
  aiTradingProfitsLink,
  aiTradingBotsSettingsLink,
  aiTradingBotsStatisticLink,
} from 'src/utils/links';

const { t } = useI18n();

const tabs = [
  {
    label: 'activeBots',
    to: aiTradingActiveBotsLink(),
    icon: 'smart_toy',
  },
  {
    label: 'profits',
    to: aiTradingProfitsLink(),
    icon: 'file_upload',
  },
  {
    label: 'settings',
    to: aiTradingBotsSettingsLink(),
    icon: 'settings',
  },
  {
    label: 'statistic',
    to: aiTradingBotsStatisticLink(),
    icon: 'analytics',
  },
];
</script>

<template>
  <div class="q-px-md">
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
    "activeBots": "Active bots",
    "profits": "Profits",
    "settings": "Settings",
    "statistic": "Statistic",
  }
}
</i18n>
