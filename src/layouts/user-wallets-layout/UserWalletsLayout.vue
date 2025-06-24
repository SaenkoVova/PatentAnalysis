<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { userMainWalletLink, userTradingWalletLink } from 'src/utils/links';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const tabs = [
  {
    label: 'mainWallet',
    to: userMainWalletLink(props.userId, props.accountId),
    icon: 'currency_bitcoin',
  },
  {
    label: 'tradingWallet',
    to: userTradingWalletLink(props.userId, props.accountId),
    icon: 'swap_horiz',
  },
];
</script>

<template>
  <div>
    <q-tabs active-color="primary" inline-label align="left" class="q-mb-sm">
      <q-route-tab
        no-caps
        v-for="(item, idx) in tabs"
        :key="idx"
        :label="t(item.label)"
        :to="item.to"
        :icon="item.icon"
      />
    </q-tabs>
    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "mainWallet": "Main wallet",
    "tradingWallet": "Trading wallet"
  }
}
</i18n>
