<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import {
  createMonthProfit,
  createMonthProfitPersonal,
} from 'src/api/trading-bot/AdminMonthProfitApi';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { IOption } from 'src/types/common/IOption';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import BotType from 'components/ai-trading/bot-type/BotType.vue';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';
import type { IMonthProfit } from 'src/types/ai-trading/IMonthProfit';

interface IProps {
  availableBotTypes: IOption<BotTypesEnum>[];
  action: 'create' | 'edit';
  accountId?: string;
  monthProfit?: IMonthProfit;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const selectedBotType = ref(props.availableBotTypes[0]);
const monthPercentage = ref(props.monthProfit?.monthProfit);

const { mutate: createMonthProfitAsync, isPending: createMonthProfitPending } = useMutation({
  mutationFn: createMonthProfit,
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

const { mutate: createMonthProfitPersonalAsync, isPending: createMonthProfitPersonalPending } =
  useMutation({
    mutationFn: createMonthProfitPersonal,
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
  const payload = {
    botType: selectedBotType.value?.value as BotTypesEnum,
    monthPercentage: monthPercentage.value as number,
  };

  if (!props.accountId) {
    createMonthProfitAsync(payload);
  } else {
    createMonthProfitPersonalAsync({
      accountId: props.accountId,
      data: payload,
    });
  }
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{
          t(props.action === 'create' ? 'createProfit' : 'editProfit')
        }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form @submit.prevent="onSubmit">
          <app-select
            :label="t('botType')"
            v-model="selectedBotType"
            :options="availableBotTypes"
            :disable="availableBotTypes.length === 1"
          >
            <template #selected>
              <bot-type v-if="selectedBotType" :bot-type="selectedBotType.value" />
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <bot-type :bot-type="scope.opt.value" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <q-input
            type="number"
            v-model="monthPercentage"
            outlined
            dense
            class="q-mb-md"
            :label="t('monthPercentage')"
            :rules="[requiredField({}), moreThan(0, {})]"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="createMonthProfitPending || createMonthProfitPersonalPending"
          >
            <div class="flex items-center">
              <span>{{ t(props.action === 'create' ? 'createProfit' : 'editProfit') }}</span>
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
    "botType": "Bot type",
    "monthPercentage": "Month percentage",
    "editProfit": "Edit profit",
    "createProfit": "Create profit",
    "publicMonthPercentage": "Public month percentage"
  }
}
</i18n>
