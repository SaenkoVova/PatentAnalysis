<script setup lang="ts">
import { isAccountTx } from 'src/utils/utils';
import { TransactionTypesEnum } from 'src/enums/crypto/TransactionTypesEnum';
import { computed, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { TransactionStatusesEnum } from 'src/enums/crypto/TransactionStatusesEnum';

interface IProps {
  status: TransactionStatusesEnum;
  hash: string;
  type: TransactionTypesEnum;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const icon = computed(() => {
  if (props.status === TransactionStatusesEnum.HOLD) {
    return defineAsyncComponent(() => import('src/components/icons/HoldSvg.vue'));
  }

  if (props.status === TransactionStatusesEnum.REJECTED) {
    return defineAsyncComponent(() => import('src/components/icons/RejectedSvg.vue'));
  }

  if (props.status === TransactionStatusesEnum.FAILED) {
    return defineAsyncComponent(() => import('src/components/icons/RejectedSvg.vue'));
  }

  if (props.status.includes('PENDING')) {
    return defineAsyncComponent(() => import('src/components/icons/PendingSvg.vue'));
  }

  if (isAccountTx(props.hash)) {
    return defineAsyncComponent(() => import('src/components/icons/CompletedSvg.vue'));
  }
  if (props.type === TransactionTypesEnum.WITHDRAW) {
    return defineAsyncComponent(() => import('src/components/icons/SentSvg.vue'));
  }

  return defineAsyncComponent(() => import('src/components/icons/ReceivedSvg.vue'));
});

const text = computed(() => {
  if (props.status === TransactionStatusesEnum.HOLD) {
    return 'hold';
  }

  if (props.status === TransactionStatusesEnum.FAILED) {
    return 'failed';
  }

  if (props.status === TransactionStatusesEnum.REJECTED) {
    return 'rejected';
  }

  if (props.status.includes('PENDING')) {
    return 'pending';
  }

  if (isAccountTx(props.hash)) {
    return 'completed';
  }

  if (props.type === TransactionTypesEnum.WITHDRAW) {
    return 'sent';
  }

  return 'received';
});

const statusClass = computed(() => {
  if (props.status === TransactionStatusesEnum.HOLD) {
    return {
      'text-negative': true,
    };
  }

  if (props.status === TransactionStatusesEnum.FAILED) {
    return {
      'text-negative': true,
    };
  }

  if (props.status === TransactionStatusesEnum.REJECTED) {
    return {
      'text-negative': true,
    };
  }

  if (props.status.includes('PENDING')) {
    return {
      'text-secondary': true,
    };
  }

  if (isAccountTx(props.hash)) {
    return {
      'text-warning': true,
    };
  }

  if (props.type === TransactionTypesEnum.WITHDRAW) {
    return {
      'text-info': true,
    };
  }

  return {
    'text-positive': true,
  };
});
</script>

<template>
  <div :class="statusClass" class="cursor-pointer flex items-center">
    <component class="q-mr-xs" :is="icon" />
    {{ t(text) }}

    <q-btn
      v-if="status.split('_').length > 1"
      :class="statusClass"
      class="q-ml-xs"
      color="primary"
      size="sm"
      dense
      flat
      icon="info"
      outline
    >
      <q-tooltip anchor="top middle" self="bottom middle">
        <span class="text-weight-bold text-body2">{{ t(status) }}</span>
      </q-tooltip>
    </q-btn>
  </div>
</template>

<i18n>
{
  "en": {
    "received": "Received",
    "completed": "Completed",
    "sent": "Sent",
    "rejected": "Rejected",
    "hold": "Hold",
    "pending": "Pending",
    "PENDING": "Pending",
    "PENDING_CHECK_CONFIRMATIONS": "Pending check confirmations",
    "PENDING_CHECK_AML_CONFIRM": "Pending check AML confirmations",
    "PENDING_LIQUIDITY_TRANSFER": "Pending liquidity transfer",
    "PENDING_MAX_AMOUNT_LIMIT": "Pending max amount limit",
    "PENDING_WAIT_SYSTEM_BALANCE": "Pending wait system balance",
    "PENDING_WAIT_SYSTEM_FEE_FOR_SENDING": "Pending wait system fee for sending",
    "RECEIVED": "Received",
    "SENT": "Sent",
    "HOLD": "Hold",
    "REJECTED": "Rejected",
    "SUCCESS": "Success",
    "FAILED": "Failed"
  }
}
</i18n>
