<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  aiTradingAlgorithmSettingsLink,
  aiTradingBotsSettingsLink,
} from 'src/utils/links';

const { t } = useI18n();

const tabs = [
  {
    label: 'bots',
    to: aiTradingBotsSettingsLink(),
    icon: 'smart_toy',
  },
  {
    label: 'algorithms',
    to: aiTradingAlgorithmSettingsLink(),
    icon: 'calculate',
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
    "bots": "Bots",
    "algorithms": "Algorithms"
  }
}
</i18n>
