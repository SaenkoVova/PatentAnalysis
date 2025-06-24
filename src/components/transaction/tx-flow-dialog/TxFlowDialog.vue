<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppCard from 'components/common/app-card/AppCard.vue';
import { useI18n } from 'vue-i18n';
import type { ITransactionFlow } from 'src/types/crypto/ITransactionFlow';
import TxHash from 'components/transaction/tx-hash/TxHash.vue';
import TxType from 'components/transaction/tx-type/TxType.vue';
import TxAddress from 'components/transaction/tx-address/TxAddress.vue';
import AppTable from 'components/common/app-table/AppTable.vue';
import CoinWithIcon from 'components/common/coin-with-icon/CoinWithIcon.vue';
import TxNetwork from 'components/transaction/tx-network/TxNetwork.vue';
import TxStatus from 'components/transaction/tx-status/TxStatus.vue';
import { timestamp } from 'src/composable/Timestamp';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { ITableColumn } from 'src/types/common/ITableColumn';

interface IProps {
  flow: ITransactionFlow;
  userId: string;
  accountId: string;
}

defineProps<IProps>();

const { t } = useI18n();

const $q = useQuasar();
const appDialogRef = ref();

const transactionsColumns: ITableColumn[] = [
  {
    name: 'created',
    label: 'created',
    field: 'created',
    format: (val: number) => timestamp(val),
    align: 'left',
  },
  {
    name: 'amount',
    label: 'amount',
    field: 'amount',
    align: 'left',
  },
  {
    name: 'currency',
    label: 'currency',
    field: 'currency',
    align: 'left',
  },
  {
    name: 'network',
    label: 'network',
    field: 'network',
    align: 'left',
  },
  {
    name: 'fee',
    label: 'fee',
    field: 'fee',
    format: (val: number | null) => val || '-',
    align: 'left',
  },
  {
    name: 'type',
    label: 'type',
    field: 'type',
    align: 'left',
  },
  {
    name: 'status',
    label: 'status',
    field: 'status',
    align: 'left',
  },
  {
    name: 'fromAddress',
    label: 'fromAddress',
    field: 'fromAddress',
    align: 'left',
  },
  {
    name: 'toAddress',
    label: 'toAddress',
    field: 'toAddress',
    align: 'left',
  },
  {
    name: 'hash',
    label: 'hash',
    field: 'hash',
    align: 'left',
  },
];

const isDesktopTable = computed(() => $q.screen.xl || $q.screen.lg);

const visibleColumns = computed(() => {
  if (isDesktopTable.value) return transactionsColumns.map((i) => i.name);

  if ($q.screen.md) {
    return ['created', 'amount', 'currency', 'network', 'fee', 'type', 'status'];
  }

  if ($q.screen.sm) {
    return ['created', 'amount', 'currency', 'network', 'fee'];
  }

  return ['created', 'amount'];
});

const onRetry = () => {
  appDialogRef.value.onDialogOK();
};
</script>

<template>
  <app-dialog ref="appDialogRef" full-width position="bottom">
    <app-dialog-content class="q-px-md q-pb-xl">
      <q-toolbar class="no-padding">
        <q-toolbar-title>{{ t('transactionFlow') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <div class="row q-mb-md q-col-gutter-md">
        <div class="col">
          <app-card>
            <app-card-section class="flex column items-center">
              <p>{{ t('finished') }}</p>
              <p
                :class="{
                  'text-positive': flow.finished,
                  'text-negative': !flow.finished,
                }"
              >
                {{ t(flow.finished ? 'yes' : 'no') }}
              </p>
            </app-card-section>
          </app-card>
        </div>
        <div class="col">
          <app-card>
            <app-card-section class="flex column items-center">
              <p>{{ t('hasErrors') }}</p>
              <p
                :class="{
                  'text-positive': !flow.hasError,
                  'text-negative': flow.hasError,
                }"
              >
                {{ t(flow.hasError ? 'yes' : 'no') }}
              </p>
            </app-card-section>
          </app-card>
        </div>
      </div>

      <div>
        <app-table
          :columns="transactionsColumns"
          :rows="flow.transactions"
          :visible-columns="visibleColumns"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold">
                {{ t(col.label) }}
              </q-th>
              <q-th v-if="!isDesktopTable" auto-width />
            </q-tr>
          </template>

          <template #body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <template v-if="col.name === 'currency'">
                  <coin-with-icon :coin="col.value" />
                </template>
                <template v-else-if="col.name === 'network'">
                  <tx-network :hash="props.row.hash" :network="col.value" />
                </template>
                <template v-else-if="col.name === 'type'">
                  <tx-type :hash="props.row.hash" :type="col.value" />
                </template>
                <template v-else-if="col.name === 'status'">
                  <tx-status
                    class="flex items-center no-wrap"
                    :hash="props.row.hash"
                    :status="col.value"
                    :type="props.row.type"
                  />
                </template>

                <template v-else-if="col.name === 'fromAddress' || col.name === 'toAddress'">
                  <tx-address :address="col.value" :network="props.row.network" />
                </template>
                <template v-else-if="col.name === 'hash'">
                  <tx-hash
                    :user-id="userId"
                    :account-id="accountId"
                    :hash="col.value"
                    :type="props.row.type"
                    :status="props.row.status"
                    :network="props.row.network"
                    :transaction-id="props.row.id.toString()"
                    @retry="onRetry"
                  />
                </template>
                <template v-else>
                  {{ col.value }}
                </template>
              </q-td>
              <q-td v-if="!isDesktopTable" auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  @click.stop="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div v-if="$q.screen.xs" class="flex justify-between">
                  <div>{{ t('currency') }}:</div>
                  <div>
                    <coin-with-icon :coin="props.row.currency" />
                  </div>
                </div>
                <div v-if="$q.screen.xs" class="flex justify-between">
                  <div>{{ t('network') }}:</div>
                  <div>
                    <tx-network :hash="props.row.hash" :network="props.row.network" />
                  </div>
                </div>
                <div v-if="$q.screen.xs" class="flex justify-between">
                  <div>{{ t('fee') }}:</div>
                  <div>
                    {{ props.row.fee || '-' }}
                  </div>
                </div>

                <div v-if="$q.screen.xs || $q.screen.sm" class="flex justify-between">
                  <div>{{ t('type') }}:</div>
                  <div>
                    <tx-type :hash="props.row.hash" :type="props.row.type" />
                  </div>
                </div>

                <div v-if="$q.screen.xs || $q.screen.sm" class="flex justify-between">
                  <div>{{ t('status') }}:</div>
                  <div>
                    <tx-status
                      class="flex items-center no-wrap"
                      :hash="props.row.hash"
                      :status="props.row.status"
                      :type="props.row.type"
                    />
                  </div>
                </div>

                <div class="flex justify-between">
                  <div>{{ t('fromAddress') }}:</div>
                  <div>
                    <tx-address :address="props.row.fromAddress" :network="props.row.network" />
                  </div>
                </div>

                <div class="flex justify-between">
                  <div>{{ t('toAddress') }}:</div>
                  <div>
                    <tx-address :address="props.row.toAddress" :network="props.row.network" />
                  </div>
                </div>

                <div class="flex justify-between">
                  <div>{{ t('hash') }}:</div>
                  <div>
                    <tx-hash
                      :user-id="userId"
                      :account-id="accountId"
                      :hash="props.row.hash"
                      :type="props.row.type"
                      :status="props.row.status"
                      :network="props.row.network"
                      :transaction-id="props.row.id.toString()"
                      @retry="onRetry"
                    />
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </app-table>
      </div>
    </app-dialog-content>
  </app-dialog>
</template>

<i18n>
{
  "en": {
    "currentFlowType": "Current flow type",
    "finished": "Finished",
    "hasErrors": "Has errors",
    "no": "No",
    "yes": "Yes",
    "created": "Created",
    "amount": "Amount",
    "currency": "Currency",
    "network": "Network",
    "fee": "Fee",
    "type": "Type",
    "status": "Status",
    "fromAddress": "From",
    "toAddress": "To",
    "hash": "Hash",
    "transactionFlow": "Transaction flow"
  }
}
</i18n>
