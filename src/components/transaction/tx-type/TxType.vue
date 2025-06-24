<script setup lang="ts">
import { isAccountTx } from 'src/utils/utils';
import { TransactionTypesEnum } from 'src/enums/crypto/TransactionTypesEnum';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface IProps {
  hash: string;
  type: TransactionTypesEnum;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const text = computed(() => {
  if (isAccountTx(props.hash)) {
    return 'transfer';
  }
  return props.type.toLowerCase();
});

const typeClass = computed(() => {
  if (isAccountTx(props.hash)) {
    return {
      'text-warning': true,
    };
  }
  if (props.type === TransactionTypesEnum.DEPOSIT) {
    return {
      'text-positive': true,
    };
  }
  return {
    'text-negative': true,
  };
});

const icon = computed(() => {
  if (isAccountTx(props.hash)) {
    return 'swap_horiz';
  }
  if (props.type === TransactionTypesEnum.DEPOSIT) {
    return 'download';
  }
  return 'upload';
});
</script>

<template>
  <div :class="typeClass">
    <q-icon class="q-mr-xs" :name="icon" />
    <span>{{ t(text) }}</span>
  </div>
</template>

<i18n>
{
  "en": {
    "transfer": "Transfer",
    "withdraw": "Withdraw",
    "deposit": "Deposit",
    "transfer_to_system": "Transfer to system",
    "send_gas": "Send gas"
  }
}
</i18n>
