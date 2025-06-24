<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { updateAlgorithm } from 'src/api/trading-bot/AdminBotSettingApi';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import { useValidation } from 'src/composable/useValidation';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import type { IAlgorithmTune } from 'src/types/ai-trading/IAlgorithmTune';

interface IProps {
  algorithm: IAlgorithmTune;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, minValue } = useValidation();

const riskLevel = ref(props.algorithm.riskLevel);
const profitPercent = ref(props.algorithm.profitPercent);

const { mutate: updateAlgorithmAsync, isPending: updateAlgorithmPending } = useMutation({
  mutationFn: updateAlgorithm,
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
  updateAlgorithmAsync({
    type: props.algorithm.type,
    riskLevel: riskLevel.value,
    profitPercent: profitPercent.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('updateAlgorithm') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({}), minValue(0, {})]"
            dense
            outlined
            class="q-mb-sm"
            type="number"
            v-model="riskLevel"
            :label="t('riskLevel')"
          />
          <q-input
            dense
            outlined
            class="q-mb-sm"
            type="number"
            :rules="[requiredField({}), minValue(0, {})]"
            v-model="profitPercent"
            :label="t('profitPercent')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="updateAlgorithmPending"
          >
            <div class="flex items-center">
              <span>{{ t('updateAlgorithm') }}</span>
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
    "updateAlgorithm": "Update algorithm",
    "riskLevel": "Risk level",
    "profitPercent": "Profit percent",
  }
}
</i18n>
