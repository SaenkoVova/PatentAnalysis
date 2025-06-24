<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { useValidation } from 'src/composable/useValidation';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import type { ICurrencyFee } from 'src/types/crypto/ICurrencyFee';
import { changeCurrencyFee } from 'src/api/crypto/AdminRestApi';

interface IProps {
  currencyFee: ICurrencyFee;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const internalMinAmount = ref(props.currencyFee.innerMinAmount);
const internalMaxAmount = ref(props.currencyFee.innerMaxAmount);
const internalPercentByAmount = ref(props.currencyFee.innerPercentByAmount);
const externalMinAmount = ref(props.currencyFee.externalMinAmount);
const externalMaxAmount = ref(props.currencyFee.externalMaxAmount);
const externalPercentByAmount = ref(props.currencyFee.externalPercentByAmount);

const { mutate: changeCurrencyFeeAsync, isPending: changeCurrencyFeePending } = useMutation({
  mutationFn: changeCurrencyFee,
  onSuccess() {
    appDialogRef.value.onDialogOK();
  },
  onError(error) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: t(formatException(error)),
    });
  },
});

const onSubmit = () => {
  changeCurrencyFeeAsync({
    currency: props.currencyFee.currency,
    network: props.currencyFee.network,
    internalMinAmount: internalMinAmount.value,
    internalMaxAmount: internalMaxAmount.value,
    internalPercentByAmount: internalPercentByAmount.value,
    externalMinAmount: externalMinAmount.value,
    externalMaxAmount: externalMaxAmount.value,
    externalPercentByAmount: externalPercentByAmount.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <app-card-section>
        <q-toolbar class="q-mt-sm">
          <q-toolbar-title>{{ t('changeCurrencyFee') }}</q-toolbar-title>
          <q-space />
          <app-dialog-close />
        </q-toolbar>
        <q-form greedy @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="internalMinAmount"
            :label="t('internalMinAmount')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="internalMaxAmount"
            :label="t('internalMaxAmount')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="internalPercentByAmount"
            :label="t('internalPercentByAmount')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="externalMinAmount"
            :label="t('externalMinAmount')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="externalMaxAmount"
            :label="t('externalMaxAmount')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="externalPercentByAmount"
            :label="t('externalPercentByAmount')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="changeCurrencyFeePending"
          >
            <div class="flex items-center">
              <span>{{ t('changeCurrencyFee') }}</span>
              <q-icon class="q-ml-sm" size="xs" name="edit" />
            </div>
          </q-btn>
        </q-form>
      </app-card-section>
    </app-dialog-content>
  </app-dialog>
</template>

<i18n>
{
  "en": {
    "changeCurrencyFee": "Change currency fee",
    "internalMinAmount": "Internal min amount",
    "internalMaxAmount": "Internal max amount",
    "internalPercentByAmount": "Internal percent by amount",
    "externalMinAmount": "External min amount",
    "externalMaxAmount": "External max amount",
    "externalPercentByAmount": "External percent by amount",
  }
}
</i18n>
