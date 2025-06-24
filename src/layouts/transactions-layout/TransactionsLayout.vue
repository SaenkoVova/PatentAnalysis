<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { transactionsLink, withdrawalRequestsLink } from 'src/utils/links';

const { t } = useI18n();

const tabs = [
  {
    label: 'transactions',
    to: transactionsLink(),
    icon: 'receipt',
  },
  {
    label: 'withdrawalRequests',
    to: withdrawalRequestsLink(),
    icon: 'savings',
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
    "transactions": "Transactions",
    "withdrawalRequests": "Withdrawal requests",
  }
}
</i18n>
