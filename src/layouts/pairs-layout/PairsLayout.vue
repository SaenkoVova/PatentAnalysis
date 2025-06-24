<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { pairsCurrenciesLink, pairsLink } from 'src/utils/links';

const { t } = useI18n();

const tabs = [
  {
    label: 'pairs',
    to: pairsLink(),
    icon: 'swap_horizontal_circle',
  },
  {
    label: 'currencies',
    to: pairsCurrenciesLink(),
    icon: 'monetization_on',
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
    "pairs": "Pairs",
    "currencies": "Currencies",
  }
}
</i18n>
