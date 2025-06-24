<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { computed, ref } from 'vue';
import { ALGORITHM_TUNING_TYPES } from 'src/utils/consts';
import {
  topUpDemoBotForUser,
  topUpDefaultBotForUser,
} from 'src/api/trading-bot/AdminTradingBotApi';
import { useValidation } from 'src/composable/useValidation';
import { getBotsSettings } from 'src/api/trading-bot/TradingBotApi';
import type { IActivateDefaultBotRequest } from 'src/types/ai-trading/IActivateDefaultBotRequest';
import type { IActivateDemoBotRequest } from 'src/types/ai-trading/IActivateDemoBotRequest';
import { BotOriginsEnum } from 'src/enums/ai-trading/BotOriginsEnum';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import BotType from 'components/ai-trading/bot-type/BotType.vue';
import CoinWithIcon from 'components/common/coin-with-icon/CoinWithIcon.vue';
import BotAlgorithm from 'components/ai-trading/bot-algorithm/BotAlgorithm.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { getExpectedMinValue } from 'src/api/wallet/AdminWalletApi';
import type { IBot } from 'src/types/ai-trading/IBot';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

interface IProps {
  accountId: string;
  bots: IBot[];
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const { requiredField, minValue } = useValidation();
const appDialogRef = ref();

const autoReinvest = ref(true);
const ownDeposit = ref(false);
const distributeProfit = ref(false);
const enabledWithdrawProfit = ref(false);
const amount = ref();
const algorithmTuning = ref(ALGORITHM_TUNING_TYPES[0]);
const selectedBotType = ref(props.bots[0]);

const { data: botsSettings, isFetching: botsSettingsFetching } = useQuery({
  queryKey: ['get-bots-settings'],
  queryFn: getBotsSettings,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const minStartAmount = computed(() => {
  return (
    botsSettings.value?.find((i) => i.botType === selectedBotType.value?.botType)?.minStartAmount ||
    0
  );
});

const botCurrency = computed(
  () => props.bots.find((i) => i.botType === selectedBotType.value?.botType)?.currency,
);

const botOrigin = computed(
  () => props.bots.find((i) => i.botType === selectedBotType.value?.botType)?.origin,
);

const expectedMinValueRequestEnabled = computed(() => !!botCurrency.value);

const { data: expectedMinValue } = useQuery({
  queryKey: ['get-expected-min-value', { minStartAmount, botCurrency }],
  queryFn: () =>
    getExpectedMinValue({
      currency: botCurrency.value as string,
      usdValue: minStartAmount.value,
    }),
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  enabled: expectedMinValueRequestEnabled,
});

const { mutateAsync: topUpDefaultBotForUserAsync, isPending: topUpDefaultBotForUserPending } =
  useMutation({
    mutationFn: topUpDefaultBotForUser,
  });

const { mutateAsync: topUpDemoBotForUserAsync, isPending: topUpDemoBotForUserPending } =
  useMutation({
    mutationFn: topUpDemoBotForUser,
  });

const onSubmit = async () => {
  try {
    const defaultBotBody: IActivateDefaultBotRequest = {
      botType: selectedBotType.value?.botType as BotTypesEnum,
      autoReinvest: autoReinvest.value,
      amount: amount.value,
      algorithmTuning: algorithmTuning.value?.value as AlgorithmTunesEnum,
    };

    const demoBotBody: IActivateDemoBotRequest = {
      ...defaultBotBody,
      ownDeposit: ownDeposit.value,
      distributeProfit: distributeProfit.value,
      enabledWithdrawProfit: enabledWithdrawProfit.value,
    };

    if (botOrigin.value === BotOriginsEnum.DEFAULT) {
      await topUpDefaultBotForUserAsync({
        accountId: props.accountId,
        bot: defaultBotBody,
      });
    } else {
      await topUpDemoBotForUserAsync({
        accountId: props.accountId,
        bot: demoBotBody,
      });
    }

    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('botReplenished'),
      timeout: 2000,
      progress: true,
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
        <q-toolbar-title>{{ t('topUpBot') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form greedy @submit.prevent="onSubmit">
          <q-item disable class="q-mb-md no-padding">
            <q-item-section>
              <q-item-label>{{ t('currency') }}</q-item-label>
              <coin-with-icon class="q-my-xs" v-if="botCurrency" :coin="botCurrency" />
            </q-item-section>
          </q-item>

          <app-select
            :label="t('botType')"
            v-model="selectedBotType"
            :options="bots"
            :option-value="(option) => option.botType"
            :option-label="(option) => option.botType"
          >
            <template #selected>
              <bot-type v-if="selectedBotType" :bot-type="selectedBotType.botType" />
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <bot-type :bot-type="scope.opt.botType" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <app-select
            :label="t('algorithmTuningType')"
            v-model="algorithmTuning"
            :options="ALGORITHM_TUNING_TYPES"
          >
            <template #selected>
              <bot-algorithm v-if="algorithmTuning" :algorithm="algorithmTuning.value" />
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <bot-algorithm :algorithm="scope.opt.value" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <div>
            <q-checkbox class="q-mb-sm" v-model="autoReinvest">
              <span class="q-mr-sm">{{ t('autoReinvest') }}</span>
            </q-checkbox>
          </div>

          <div v-if="botOrigin === BotOriginsEnum.DEMO">
            <q-checkbox class="q-mb-sm" v-model="ownDeposit">
              <span class="q-mr-sm">
                {{ t('includeBotAmountToOwnDeposit') }}
              </span>
            </q-checkbox>
          </div>

          <div v-if="botOrigin === BotOriginsEnum.DEMO">
            <q-checkbox class="q-mb-sm" v-model="distributeProfit">
              <span class="q-mr-sm"> {{ t('distributeProfit') }} </span>
            </q-checkbox>
          </div>

          <div v-if="botOrigin === BotOriginsEnum.DEMO">
            <q-checkbox class="q-mb-sm" v-model="enabledWithdrawProfit">
              <span class="q-mr-sm"> {{ t('enableProfitWithdraw') }} </span>
            </q-checkbox>
          </div>

          <q-input
            dense
            type="number"
            :label="t('amount')"
            outlined
            v-model="amount"
            :readonly="!expectedMinValue"
            reactive-rules
            :rules="[requiredField({}), minValue(expectedMinValue?.quantityInCurrency || 0, {})]"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="
              topUpDemoBotForUserPending || topUpDefaultBotForUserPending || botsSettingsFetching
            "
          >
            <div class="flex items-center">
              <span>{{ t('topUpBot') }}</span>
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
    "botReplenished": "Bot replenished",
    "topUpBot": "Top up bot",
    "currency": "Currency",
    "algorithmTuningType": "Algorithm tuning type",
    "autoReinvest": "Auto reinvest",
    "amount": "Amount",
    "includeBotAmountToOwnDeposit": "Include bot amount to own deposit",
    "distributeProfit": "Distribute profit",
    "enableProfitWithdraw": "Enable profit withdraw"
  }
}
</i18n>
