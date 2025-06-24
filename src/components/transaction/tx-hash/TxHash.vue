<script setup lang="ts">
import { computed } from 'vue';
import { buildExplorerLink, formatException, isAccountTx, isGameTx } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';
import { TransactionTypesEnum } from 'src/enums/crypto/TransactionTypesEnum';
import { TransactionStatusesEnum } from 'src/enums/crypto/TransactionStatusesEnum';
import { useAddressShortener } from 'src/composable/useAddressShortener';
import { userMainWalletLink, userSandboxInfoLink, userTradingWalletLink } from 'src/utils/links';
import { copyToClipboard, useQuasar } from 'quasar';
import { useMutation } from '@tanstack/vue-query';
import {
  withdrawalRequestApprove,
  withdrawalRequestReject,
} from 'src/api/crypto/WithdrawalRequestAdminApi';
import { EventsEnum } from 'src/enums/common/EventsEnum';
import { retryTransaction } from 'src/api/crypto/RetryRestAdminApi';

interface IProps {
  hash: string;
  type: TransactionTypesEnum;
  status: TransactionStatusesEnum;
  network: string;
  userId: string;
  accountId?: string;
  transactionId: string;
}

type ExchangeWallet = 'main' | 'trading' | 'sandbox';

const props = defineProps<IProps>();
const emits = defineEmits([EventsEnum.APPROVE, EventsEnum.REJECT, EventsEnum.RETRY]);
const $q = useQuasar();

const { t } = useI18n();

const fromWallet = computed<ExchangeWallet>(() => {
  if (isGameTx(props.hash)) {
    if (props.hash.includes('GAME_TO_TRADE')) {
      return 'sandbox';
    }
    if (props.hash.includes('TRADE_TO_GAME')) {
      return 'trading';
    }
    if (props.type === TransactionTypesEnum.WITHDRAW) {
      return 'main';
    }
    return 'sandbox';
  }

  if (props.type === TransactionTypesEnum.DEPOSIT) {
    return 'trading';
  }

  return 'main';
});

const toWallet = computed<ExchangeWallet>(() => {
  if (isGameTx(props.hash)) {
    if (props.hash.includes('GAME_TO_TRADE')) {
      return 'trading';
    }
    if (props.hash.includes('TRADE_TO_GAME')) {
      return 'sandbox';
    }
    if (props.type === TransactionTypesEnum.WITHDRAW) {
      return 'sandbox';
    }
    return 'main';
  }

  if (props.type === TransactionTypesEnum.DEPOSIT) {
    return 'main';
  }

  return 'trading';
});

const isHash = computed(() => props.hash.match(/^[a-fA-F0-9]{64}$/) || props.hash.startsWith('0x'));

const text = computed(() => {
  if (props.hash.includes('SYSTEM')) {
    return 'systemTransfer';
  }
  if (props.hash.includes('INNER')) {
    return 'internalTransfer';
  }
  return undefined;
});

const fromWalletLink = computed(() => {
  switch (fromWallet.value) {
    case 'main':
      return userMainWalletLink(props.userId, props.accountId);
    case 'trading':
      return userTradingWalletLink(props.userId, props.accountId);
    default:
      return userSandboxInfoLink(props.userId, props.accountId);
  }
});

const toWalletLink = computed(() => {
  switch (toWallet.value) {
    case 'main':
      return userMainWalletLink(props.userId, props.accountId);
    case 'trading':
      return userTradingWalletLink(props.userId, props.accountId);
    default:
      return userSandboxInfoLink(props.userId, props.accountId);
  }
});

const onCopyClick = async (text: string) => {
  await copyToClipboard(text);
  $q.notify({
    type: 'positive',
    position: 'top-right',
    message: t('hashCopiedToClipboard'),
    timeout: 2000,
    progress: true,
  });
};

const { mutate: withdrawalRequestApproveAsync, isPending: withdrawalRequestApprovePending } =
  useMutation({
    mutationFn: withdrawalRequestApprove,
    onSuccess() {
      $q.notify({
        type: 'positive',
        position: 'top-right',
        timeout: 2000,
        progress: true,
        message: t('withdrawalApproved'),
      });
      emits(EventsEnum.APPROVE);
    },
    onError(error) {
      $q.notify({
        type: 'negative',
        position: 'top',
        message: t(formatException(error)),
      });
    },
  });

const { mutate: withdrawalRequestRejectAsync, isPending: withdrawalRequestRejectPending } =
  useMutation({
    mutationFn: withdrawalRequestReject,
    onSuccess() {
      $q.notify({
        type: 'positive',
        position: 'top-right',
        timeout: 2000,
        progress: true,
        message: t('withdrawalRejected'),
      });
      emits(EventsEnum.REJECT);
    },
    onError(error) {
      $q.notify({
        type: 'negative',
        position: 'top',
        message: t(formatException(error)),
      });
    },
  });

const { mutate: retryTransactionAsync, isPending: retryTransactionPending } = useMutation({
  mutationFn: retryTransaction,
  onSuccess() {
    $q.notify({
      type: 'positive',
      position: 'top-right',
      timeout: 2000,
      progress: true,
      message: t('transactionRetrying'),
    });
    emits(EventsEnum.RETRY);
  },
  onError(error) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: t(formatException(error)),
    });
  },
});

const onApprove = () => {
  $q.dialog({
    title: t('confirm'),
    message: t('areYouSureYouWantToApproveTransaction'),
    persistent: true,
    cancel: {
      label: t('cancel'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
  }).onOk(() => {
    withdrawalRequestApproveAsync(props.transactionId);
  });
};

const onReject = () => {
  $q.dialog({
    title: t('confirm'),
    message: t('areYouSureYouWantToRejectTransaction'),
    persistent: true,
    cancel: {
      label: t('cancel'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
  }).onOk(() => {
    withdrawalRequestRejectAsync(props.transactionId);
  });
};

const onRetry = () => {
  $q.dialog({
    title: t('retry'),
    message: t('areYouSureYouWantToRetryTransaction'),
    persistent: true,
    cancel: {
      label: t('cancel'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
  }).onOk(() => {
    retryTransactionAsync(props.transactionId);
  });
};
</script>

<template>
  <div>
    <template v-if="isAccountTx(props.hash)">
      {{ t('from') }}
      <router-link :to="fromWalletLink" class="cursor-pointer text-warning">{{
        t(fromWallet)
      }}</router-link>
      {{ t('to') }}
      <router-link :to="toWalletLink" class="cursor-pointer text-info">{{
        t(toWallet)
      }}</router-link>
    </template>
    <template v-else>
      <div v-if="!isHash">
        <div
          v-if="status === TransactionStatusesEnum.PENDING_MAX_AMOUNT_LIMIT"
          class="row q-col-gutter-sm"
        >
          <div class="col">
            <q-btn
              class="full-width"
              icon="done"
              dense
              :loading="withdrawalRequestApprovePending"
              color="positive"
              outline
              no-caps
              @click="onApprove"
            />
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              icon="close"
              dense
              :loading="withdrawalRequestRejectPending"
              color="negative"
              outline
              no-caps
              @click="onReject"
            />
          </div>
        </div>
        <div v-else-if="status === TransactionStatusesEnum.PENDING_WAIT_SYSTEM_BALANCE">
          <q-btn
            icon="refresh"
            class="q-mx-auto block"
            dense
            :loading="retryTransactionPending"
            color="primary"
            flat
            no-caps
            @click="onRetry"
          />
        </div>
        <span v-else>{{ t(text || '-') }}</span>
      </div>
      <template v-else>
        <div class="flex items-center no-wrap">
          <a
            class="flex items-center no-wrap"
            :href="buildExplorerLink('tx', hash, network)"
            target="_blank"
          >
            {{ useAddressShortener(hash) }}
            <q-icon class="q-ml-sm" size="xs" name="open_in_new" />
            <q-tooltip anchor="center left" self="center end">
              {{ hash }}
            </q-tooltip>
          </a>
          <q-btn icon="content_copy" flat size="sm" round @click="onCopyClick(hash)" />
        </div>
      </template>
    </template>
  </div>
</template>

<i18n>
{
  "en": {
    "userAccount": "User account",
    "systemNetwork": "System network",
    "from": "From",
    "to": "to",
    "main": "Main",
    "trading": "Trading",
    "sandbox": "Sandbox",
    "systemTransfer": "System transfer",
    "internalTransfer": "Internal transfer",
    "hashCopiedToClipboard": "Hash copied to clipboard",
    "confirm": "Confirm",
    "areYouSureYouWantToApproveTransaction": "Are you sure you want to approve transaction?",
    "areYouSureYouWantToRejectTransaction": "Are you sure you want to reject transaction?",
    "cancel": "Cancel",
    "ok": "Ok",
    "withdrawalApproved": "Withdrawal approved",
    "withdrawalRejected": "Withdrawal rejected",
    "retry": "Retry",
    "areYouSureYouWantToRetryTransaction": "Are you sure you want to retry transaction?",
    "transactionRetrying": "Transaction retrying"
  }
}
</i18n>
