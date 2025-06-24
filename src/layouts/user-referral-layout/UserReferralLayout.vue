<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  userReferralTransactionsLink,
  userReferralTreeLink,
  userReferralProfitTransactionsLink,
  userTurnoverTransactionsLink,
} from 'src/utils/links';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const tabs = [
  {
    label: 'referralTree',
    to: userReferralTreeLink(props.userId, props.accountId),
    icon: 'account_tree',
  },
  {
    label: 'referralTransactions',
    to: userReferralTransactionsLink(props.userId, props.accountId),
    icon: 'receipt_long',
  },
  {
    label: 'turnoverTransactions',
    to: userTurnoverTransactionsLink(props.userId, props.accountId),
    icon: 'paid',
  },
  {
    label: 'profitTransactions',
    to: userReferralProfitTransactionsLink(props.userId, props.accountId),
    icon: 'payments',
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
    "referralTree": "Referral tree",
    "referralTransactions": "Referral transactions",
    "turnoverTransactions": "Turnover transactions",
    "profitTransactions": "Profit transactions"
  }
}
</i18n>
