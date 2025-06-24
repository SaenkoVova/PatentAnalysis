<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref, watch } from 'vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';
import type { IPairSetting } from 'src/types/pair/IPairSetting';
import { getCurrencies, managePair } from 'src/api/pair/PairSettingsApi';
import CoinWithIcon from 'components/common/coin-with-icon/CoinWithIcon.vue';

interface IProps {
  pairSetting?: IPairSetting;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const { data: currencies, isFetching: currenciesFetching } = useQuery({
  queryKey: ['get-currencies'],
  queryFn: () =>
    getCurrencies({
      page: 0,
      size: 100,
    }),
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
});

const selectedFirstCurrency = ref(
  props.pairSetting
    ? currencies.value?.content.find(
        (i) => i.currency === props.pairSetting?.currencyFirst
      )
    : currencies.value?.content?.[0]
);
const selectedSecondCurrency = ref(
  props.pairSetting
    ? currencies.value?.content.find(
        (i) => i.currency === props.pairSetting?.currencySecond
      )
    : currencies.value?.content?.[0]
);
const scale = ref(props.pairSetting?.scale);
const takerFeePercent = ref(props.pairSetting?.takerFeePercent);
const makerFeePercent = ref(props.pairSetting?.makerFeePercent);
const minimumTrade = ref(props.pairSetting?.minimumTrade);
const active = ref(props.pairSetting?.active || false);
const tradingBotPointChart = ref(
  props.pairSetting?.tradingBotPointChart || false
);

watch(currencies, (value) => {
  selectedFirstCurrency.value =
    currencies.value?.content.find(
      (i) => i.currency === props.pairSetting?.currencyFirst
    ) || value?.content?.[0];

  selectedSecondCurrency.value =
    currencies.value?.content.find(
      (i) => i.currency === props.pairSetting?.currencySecond
    ) || value?.content?.[0];
});

const { mutate: managePairAsync, isPending: managePairPending } = useMutation({
  mutationFn: managePair,
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
  managePairAsync({
    pairName: `${selectedFirstCurrency.value?.currency}_${selectedSecondCurrency.value?.currency}`,
    currencyFirst: selectedFirstCurrency.value?.currency as string,
    currencySecond: selectedSecondCurrency.value?.currency as string,
    scale: scale.value as number,
    makerFeePercent: makerFeePercent.value as number,
    takerFeePercent: takerFeePercent.value as number,
    minimumTrade: minimumTrade.value as number,
    active: active.value,
    tradingBotPointChart: tradingBotPointChart.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{
          t(pairSetting ? 'updatePair' : 'createPair')
        }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form @submit.prevent="onSubmit">
          <app-select
            :disable="currenciesFetching"
            :loading="currenciesFetching"
            :dense="false"
            :label="t('baseCurrency')"
            v-model="selectedFirstCurrency"
            :options="currencies?.content || []"
            :option-value="(option) => option.currency"
          >
            <template #selected>
              <div class="q-my-xs">
                <coin-with-icon
                  v-if="selectedFirstCurrency"
                  :coin="selectedFirstCurrency.currency"
                />
              </div>
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <coin-with-icon :coin="scope.opt.currency" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <app-select
            :disable="currenciesFetching"
            :loading="currenciesFetching"
            :dense="false"
            :label="t('quotedCurrency')"
            v-model="selectedSecondCurrency"
            :options="currencies?.content || []"
            :option-value="(option) => option.currency"
          >
            <template #selected>
              <div class="q-my-xs">
                <coin-with-icon
                  v-if="selectedSecondCurrency"
                  :coin="selectedSecondCurrency.currency"
                />
              </div>
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">
                    <coin-with-icon :coin="scope.opt.currency" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </app-select>

          <q-input
            type="number"
            v-model="scale"
            outlined
            dense
            class="q-mb-sm"
            :label="t('scale')"
            :rules="[requiredField({}), moreThan(0, {})]"
          />

          <q-input
            type="number"
            v-model="takerFeePercent"
            outlined
            dense
            class="q-mb-sm"
            :label="t('takerFeePercent')"
            :rules="[requiredField({})]"
          />

          <q-input
            type="number"
            v-model="makerFeePercent"
            outlined
            dense
            class="q-mb-sm"
            :label="t('makerFeePercent')"
            :rules="[requiredField({})]"
          />

          <q-input
            type="number"
            v-model="minimumTrade"
            outlined
            dense
            :label="t('minimumTrade')"
            :rules="[requiredField({})]"
          />

          <div class="q-mb-md">
            <q-checkbox :label="t('active')" v-model="active" left-label />
          </div>

          <div class="q-mb-md">
            <q-checkbox
              :label="t('tradingBotPointChart')"
              v-model="tradingBotPointChart"
              left-label
            />
          </div>

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="managePairPending"
          >
            <div class="flex items-center">
              <span>{{ t(pairSetting ? 'updatePair' : 'createPair') }}</span>
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
    "createPair": "Create pair",
    "baseCurrency": "Base currency",
    "quotedCurrency": "Quoted currency",
    "scale": "Scale",
    "takerFeePercent": "Taker fee percent",
    "makerFeePercent": "Maker fee percent",
    "minimumTrade": "Minimum trade",
    "active": "Active",
    "updatePair": "Update pair",
    "tradingBotPointChart": "Trading bot point chart"
  }
}
</i18n>
