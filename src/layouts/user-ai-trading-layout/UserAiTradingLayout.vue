<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  userActiveBotsLink,
  userDistributionTransactionsLink,
  userProfitsLink,
  userWithdrawTransactionsLink,
} from 'src/utils/links';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const tabs = [
  {
    label: 'activeBots',
    to: userActiveBotsLink(props.userId, props.accountId),
    icon: 'account_tree',
  },
  {
    label: 'distributionTransactions',
    to: userDistributionTransactionsLink(props.userId, props.accountId),
    icon: 'receipt',
  },
  {
    label: 'withdrawTransactions',
    to: userWithdrawTransactionsLink(props.userId, props.accountId),
    icon: 'savings',
  },
  {
    label: 'profits',
    to: userProfitsLink(props.userId, props.accountId),
    icon: 'file_upload',
  },
];
</script>

<template>
  <div>
    <div class="row q-mb-sm">
      <div class="col-xs-12 col-sm">
        <q-tabs active-color="primary" inline-label align="left">
          <q-route-tab
            no-caps
            v-for="(item, idx) in tabs"
            :key="idx"
            :label="t(item.label)"
            :to="item.to"
            :icon="item.icon"
          />
        </q-tabs>
      </div>
    </div>
    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "activeBots": "Active bots",
    "distributionTransactions": "Distribution transactions",
    "withdrawTransactions": "Withdraw transactions",
    "profits": "Profits",
  }
}
</i18n>
