<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';
import { manageCurrency } from 'src/api/pair/PairSettingsApi';
import CoinWithIcon from 'components/common/coin-with-icon/CoinWithIcon.vue';
import type { ICurrency } from 'src/types/pair/ICurrency';

interface IProps {
  currency: ICurrency;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField } = useValidation();

const fullName = ref();

const { mutate: manageCurrencyAsync, isPending: manageCurrencyPending } = useMutation({
  mutationFn: manageCurrency,
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
  manageCurrencyAsync({
    currency: props.currency.currency,
    fullName: fullName.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('updateCurrency') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form @submit.prevent="onSubmit">
          <coin-with-icon class="q-mb-lg" :coin="currency.currency" />

          <q-input
            autofocus
            v-model="fullName"
            outlined
            dense
            class="q-mb-sm"
            :label="t('fullName')"
            :rules="[requiredField({})]"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="manageCurrencyPending"
          >
            <div class="flex items-center">
              <span>{{ t('updateCurrency') }}</span>
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
    "currency": "Currency",
    "fullName": "Full name",
    "updateCurrency": "Update currency"
  }
}
</i18n>
