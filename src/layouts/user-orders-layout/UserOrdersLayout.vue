<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { userHistoryOrdersLink, userOpenOrdersLink } from 'src/utils/links';
import { useQuery } from '@tanstack/vue-query';
import { getActivePairs } from 'src/api/pair/PairApi';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import type { IOption } from 'src/types/common/IOption';
import { coinIcons } from 'src/utils/coinIcons';
import {
  getCountUserActiveOrders,
  getCountUserActiveOrdersByPair,
  getCountUserHistoryOrders,
  getCountUserHistoryOrdersByPair,
} from 'src/api/display-order/AdminOrdersApi';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const router = useRouter();

const { t } = useI18n();

const tabs = [
  {
    label: 'open',
    to: userOpenOrdersLink(props.userId, props.accountId),
    icon: 'open_in_new',
  },
  {
    label: 'history',
    to: userHistoryOrdersLink(props.userId, props.accountId),
    icon: 'history',
  },
];

const { data: pairs, isFetching: pairsFetching } = useQuery({
  queryKey: ['get-active-pairs'],
  queryFn: getActivePairs,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const selectedPair = ref<IOption<string>>();

const userIdComputed = computed(() => props.userId);

const { data: activeOrdersCount, isFetching: activeOrdersCountFetching } = useQuery({
  queryKey: ['get-user-active-orders-count', { selectedPair, userIdComputed }],
  queryFn: () =>
    selectedPair.value
      ? getCountUserActiveOrdersByPair(props.userId, selectedPair.value.value)
      : getCountUserActiveOrders(props.userId),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const { data: historyOrdersCount, isFetching: historyOrdersCountFetching } = useQuery({
  queryKey: ['get-user-history-orders-count', { selectedPair, userIdComputed }],
  queryFn: () =>
    selectedPair.value
      ? getCountUserHistoryOrdersByPair(props.userId, selectedPair.value.value)
      : getCountUserHistoryOrders(props.userId),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const computedPairs = computed<IOption<string>[]>(
  () =>
    pairs.value?.map((i) => ({
      value: i.pair,
      label: `${i.currencyFirst}/${i.currencySecond}`,
    })) || [],
);

watch(selectedPair, async (value: IOption<string> | undefined) => {
  await router.replace({
    query: {
      pair: value?.value,
    },
  });
});

const onPairClear = () => {
  selectedPair.value = undefined;
};
</script>

<template>
  <div>
    <div class="row q-mb-sm">
      <div class="col-xs-12 col-sm">
        <q-tabs active-color="primary" inline-label align="left">
          <q-route-tab
            no-caps
            v-for="(item, idx) in tabs"
            :key="idx"
            :label="t(item.label)"
            :to="item.to"
            :icon="item.icon"
          >
            <template v-if="idx === 0">
              <q-skeleton
                v-if="activeOrdersCountFetching"
                class="q-ml-sm"
                width="20px"
                height="20px"
              />
              <span v-else class="q-ml-sm">{{ activeOrdersCount }}</span>
            </template>
            <template v-if="idx === 1">
              <q-skeleton
                v-if="historyOrdersCountFetching"
                class="q-ml-sm"
                width="20px"
                height="20px"
              />
              <span v-else class="q-ml-sm">{{ historyOrdersCount }}</span>
            </template>
          </q-route-tab>
        </q-tabs>
      </div>
      <div class="col-xs-12 col-sm-auto">
        <app-select
          flat
          borderless
          :outlined="false"
          behavior="menu"
          :bottom-slots="false"
          :hide-bottom-space="true"
          clearable
          :loading="pairsFetching"
          :disable="pairsFetching"
          v-model="selectedPair"
          :options="computedPairs"
          @clear="onPairClear"
        >
          <template #selected>
            <div class="text-bold flex items-center">
              <q-icon
                v-if="!selectedPair"
                class="q-mr-sm"
                name="filter_alt"
                color="primary"
                size="sm"
              />
              <div class="q-mr-sm">
                <q-avatar v-if="selectedPair" size="xs">
                  <q-img :src="coinIcons[selectedPair.value.split('_')[0] as string]" />
                </q-avatar>
                <q-avatar v-if="selectedPair" size="xs">
                  <q-img :src="coinIcons[selectedPair.value.split('_')[1] as string]" />
                </q-avatar>
              </div>
              <span class="text-primary">{{ selectedPair?.label || t('selectPair') }}</span>
            </div>
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section side>
                <div class="flex no-wrap items-end">
                  <q-avatar size="sm">
                    <q-img :src="coinIcons[scope.opt.value.split('_')[0]]" />
                  </q-avatar>
                  <q-avatar size="xs" style="transform: translateX(-10px)">
                    <q-img :src="coinIcons[scope.opt.value.split('_')[1]]" />
                  </q-avatar>
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold"> {{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </app-select>
      </div>
    </div>
    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "open": "Open",
    "history": "History",
    "selectPair": "Select pair"
  }
}
</i18n>
