<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { BOT_TYPES } from 'src/utils/consts';
import { createProfitToUserBot } from 'src/api/trading-bot/AdminTradingBotApi';
import { useValidation } from 'src/composable/useValidation';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import BotType from 'components/ai-trading/bot-type/BotType.vue';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

interface IProps {
  accountId: number;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const { requiredField, minValue } = useValidation();
const appDialogRef = ref();

const selectedBotType = ref(BOT_TYPES[0]);
const daysCount = ref();
const expectedProfitPercent = ref();

const { mutateAsync: createProfitToUserBotAsync, isPending: createProfitToUserBotPending } =
  useMutation({
    mutationFn: createProfitToUserBot,
  });

const onSubmit = async () => {
  try {
    await createProfitToUserBotAsync({
      accountId: props.accountId,
      data: {
        botType: selectedBotType.value?.value as BotTypesEnum,
        daysCount: daysCount.value,
        expectedProfitPercent: expectedProfitPercent.value,
      },
    });
    appDialogRef.value.onDialogOK();
  } catch (e) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: t(formatException(e as Error)),
    });
  }
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('createProfit') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form greedy @submit.prevent="onSubmit">
          <app-select :label="t('botType')" v-model="selectedBotType" :options="BOT_TYPES">
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
            dense
            type="number"
            :label="t('daysCount')"
            outlined
            v-model="daysCount"
            :rules="[requiredField({}), minValue(1, {})]"
          />

          <q-input
            type="number"
            :label="t('expectedProfitPercent')"
            outlined
            dense
            v-model="expectedProfitPercent"
            :rules="[requiredField({})]"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="createProfitToUserBotPending"
          >
            <div class="flex items-center">
              <span>{{ t('createProfit') }}</span>
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
    "createProfit": "Create profit",
    "botType": "Bot type",
    "daysCount": "Days count",
    "expectedProfitPercent": "Expected profit percent"
  }
}
</i18n>
