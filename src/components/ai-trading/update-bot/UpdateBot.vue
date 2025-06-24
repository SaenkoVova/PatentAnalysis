<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { updateBotSetting } from 'src/api/trading-bot/AdminBotSettingApi';
import type { IBotSetting } from 'src/types/ai-trading/IBotSetting';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';

interface IProps {
  botSetting: IBotSetting;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const minStartAmount = ref(props.botSetting.minStartAmount);
const defaultMonthDuration = ref(props.botSetting.defaultMonthDuration);
const defaultProfitPercent = ref(props.botSetting.defaultProfitPercent);
const withdrawProfitInterval = ref(props.botSetting.withdrawProfitInterval);

const { mutate: updateBotSettingAsync, isPending: updateBotSettingPending } = useMutation({
  mutationFn: updateBotSetting,
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
  updateBotSettingAsync({
    botType: props.botSetting.botType,
    minStartAmount: minStartAmount.value,
    defaultMonthDuration: defaultMonthDuration.value,
    defaultProfitPercent: defaultProfitPercent.value,
    withdrawProfitInterval: withdrawProfitInterval.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('updateBot') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form greedy @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            class="q-mb-md"
            outlined
            dense
            type="number"
            v-model="minStartAmount"
            :label="t('minStartAmount')"
          />
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            class="q-mb-md"
            outlined
            dense
            type="number"
            v-model="defaultMonthDuration"
            :label="t('defaultMonthDuration')"
          />
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            class="q-mb-md"
            outlined
            dense
            type="number"
            v-model="defaultProfitPercent"
            :label="t('defaultProfitPercent')"
          />
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            class="q-mb-md"
            outlined
            dense
            type="number"
            v-model="withdrawProfitInterval"
            :label="t('withdrawProfitInterval')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="updateBotSettingPending"
          >
            <div class="flex items-center">
              <span>{{ t('updateBot') }}</span>
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
    "updateBot": "Update bot",
    "minStartAmount": "Min start amount",
    "defaultMonthDuration": "Month duration",
    "defaultProfitPercent": "Public profit percent",
    "withdrawProfitInterval": "Withdraw profit interval",
  }
}
</i18n>
