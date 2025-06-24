<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { computed, ref, watch } from 'vue';
import { ALGORITHM_TUNING_TYPES, BOT_TYPES } from 'src/utils/consts';
import {
  createDefaultBotForUser,
  createDemoBotForUser,
} from 'src/api/trading-bot/AdminTradingBotApi';
import { useValidation } from 'src/composable/useValidation';
import { getBotsSettings, getCurrencies } from 'src/api/trading-bot/TradingBotApi';
import type { IOption } from 'src/types/common/IOption';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
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
import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

interface IProps {
  origin: BotOriginsEnum;
  accountId: string;
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
const selectedBotType = ref(BOT_TYPES[0]);

const { data: botsSettings, isFetching: botsSettingsFetching } = useQuery({
  queryKey: ['get-bots-settings'],
  queryFn: getBotsSettings,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const minStartAmount = computed(() => {
  return (
    botsSettings.value?.find((i) => i.botType === selectedBotType.value?.value)?.minStartAmount || 0
  );
});

const { data: currencies, isFetching: currenciesFetching } = useQuery({
  queryKey: ['get-activate-bot-currencies'],
  queryFn: getCurrencies,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

const currencyOptions = computed<IOption<string>[]>(
  () => currencies.value?.map((i) => ({ label: i.currency, value: i.currency })) || [],
);

const selectedCurrency = ref<IOption<string> | undefined>(currencyOptions.value?.[0]);

const expectedMinValueRequestEnabled = computed(() => !!selectedCurrency.value);

const { data: expectedMinValue } = useQuery({
  queryKey: ['get-expected-min-value', { minStartAmount, selectedCurrency }],
  queryFn: () =>
    getExpectedMinValue({
      currency: selectedCurrency.value?.value as string,
      usdValue: minStartAmount.value,
    }),
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  enabled: expectedMinValueRequestEnabled,
});

const { mutateAsync: createDefaultBotForUserAsync, isPending: createDefaultBotForUserPending } =
  useMutation({
    mutationFn: createDefaultBotForUser,
  });

const { mutateAsync: createDemoBotForUserAsync, isPending: createDemoBotForUserPending } =
  useMutation({
    mutationFn: createDemoBotForUser,
  });

const onSubmit = async () => {
  try {
    const defaultBotBody: IActivateDefaultBotRequest = {
      currency: selectedCurrency.value?.value as string,
      botType: selectedBotType.value?.value as BotTypesEnum,
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

    if (props.origin === BotOriginsEnum.DEFAULT) {
      await createDefaultBotForUserAsync({
        accountId: props.accountId,
        bot: defaultBotBody,
      });
    } else {
      await createDemoBotForUserAsync({
        accountId: props.accountId,
        bot: demoBotBody,
      });
    }

    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('botCreated'),
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

watch(currencyOptions, (value) => {
  selectedCurrency.value = value?.[0];
});
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('createBot') }}</q-toolbar-title>
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
                  <q-item-label>
                    <bot-type :bot-type="scope.opt.value" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <app-select
            :dense="false"
            :label="t('currency')"
            v-model="selectedCurrency"
            :options="currencyOptions"
          >
            <template #selected>
              <coin-with-icon
                class="q-my-xs"
                v-if="selectedCurrency"
                :coin="selectedCurrency.value"
              />
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <coin-with-icon :coin="scope.opt.value" />
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

          <div v-if="origin === BotOriginsEnum.DEMO">
            <q-checkbox class="q-mb-sm" v-model="ownDeposit">
              <span class="q-mr-sm">
                {{ t('includeBotAmountToOwnDeposit') }}
              </span>
            </q-checkbox>
          </div>

          <div v-if="origin === BotOriginsEnum.DEMO">
            <q-checkbox class="q-mb-sm" v-model="distributeProfit">
              <span class="q-mr-sm"> {{ t('distributeProfit') }} </span>
            </q-checkbox>
          </div>

          <div v-if="origin === BotOriginsEnum.DEMO">
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
              createDefaultBotForUserPending ||
              createDemoBotForUserPending ||
              botsSettingsFetching ||
              currenciesFetching
            "
          >
            <div class="flex items-center">
              <span>{{ t('createBot') }}</span>
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
    "botCreated": "Bot created",
    "createBot": "Create bot",
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
