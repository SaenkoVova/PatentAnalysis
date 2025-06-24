<script setup lang="ts">
import type { ITransactionFlow } from 'src/types/crypto/ITransactionFlow';
import { useQuasar } from 'quasar';
import TxFlowDialog from 'components/transaction/tx-flow-dialog/TxFlowDialog.vue';
import { EventsEnum } from 'src/enums/common/EventsEnum';

interface IProps {
  flow: ITransactionFlow | null;
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();
const emits = defineEmits([EventsEnum.RETRY]);

const $q = useQuasar();

const onFlowClick = () => {
  $q.dialog({
    component: TxFlowDialog,
    componentProps: {
      flow: props.flow,
      userId: props.userId,
      accountId: props.accountId,
    },
  }).onOk(() => {
    emits(EventsEnum.RETRY);
  });
};
</script>

<template>
  <div>
    <q-btn
      v-if="flow"
      dense
      icon="account_tree"
      @click="onFlowClick"
      flat
      :color="flow.hasError ? 'negative' : 'positive'"
      size="sm"
    />
    <span v-else>-</span>
  </div>
</template>
