<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';
import { ref } from 'vue';
import AppTable from 'components/common/app-table/AppTable.vue';
import NoRecords from 'components/common/no-records/NoRecords.vue';
import TableLoading from 'components/common/table-loading/TableLoading.vue';
import BotType from 'components/ai-trading/bot-type/BotType.vue';
import { useQuery } from '@tanstack/vue-query';
import { getMonthProfitPersonal } from 'src/api/trading-bot/AdminMonthProfitApi';
import type { ITableColumn } from 'src/types/common/ITableColumn';

const { t } = useI18n();

enum FiltersEnum {
  QUERY = 'QUERY',
  SPECIFICATIONS = 'SPECIFICATIONS',
  COUNTRY_CODES = 'COUNTRY_CODES',
  DATE_FROM = 'DATE_FROM',
  DATE_TO = 'DATE_TO',
  ASSIGNEES = 'ASSIGNEES',
  INVENTORS = 'INVENTORS',
}

const reports = [
  {
    value: 'report1',
    filters: [
      FiltersEnum.QUERY,
      FiltersEnum.SPECIFICATIONS,
      FiltersEnum.COUNTRY_CODES,
      FiltersEnum.DATE_FROM,
      FiltersEnum.DATE_TO,
    ],
  },
  {
    value: 'report2',
    filters: [
      FiltersEnum.QUERY,
      FiltersEnum.ASSIGNEES,
      FiltersEnum.COUNTRY_CODES,
      FiltersEnum.DATE_FROM,
      FiltersEnum.DATE_TO,
    ],
  },
  {
    value: 'report3',
    filters: [
      FiltersEnum.QUERY,
      FiltersEnum.SPECIFICATIONS,
      FiltersEnum.COUNTRY_CODES,
      FiltersEnum.ASSIGNEES,
      FiltersEnum.INVENTORS,
      FiltersEnum.DATE_FROM,
      FiltersEnum.DATE_TO,
    ],
  },
];

const report = ref(reports[0]?.value);

const query = ref();

const specifications = ref<string[]>([]);
const countryCodes = ref<string[]>([]);
const assignees = ref<string[]>([]);
const inventors = ref<string[]>([]);
const dateFrom = ref();
const dateTo = ref();

const createValue = (val: string, done: (val: any) => void, model: Ref<string[]>) => {
  if (val.length > 0) {
    const modelValue = (model.value || []).slice();

    val
      .split(/[,;|]+/)
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
      .forEach((v) => {
        // if (!stringOptions.includes(v)) {
        //   stringOptions.push(v);
        // }
        if (!modelValue.includes(v)) {
          modelValue.push(v);
        }
      });

    done(null);
    model.value = modelValue;
  }
};

const createSpecifications = (val: string, done: (val: any) => void) => {
  createValue(val, done, specifications);
};

const createCountryCodes = (val: string, done: (val: any) => void) => {
  createValue(val, done, countryCodes);
};

const createAssignees = (val: string, done: (val: any) => void) => {
  createValue(val, done, assignees);
};

const createInventors = (val: string, done: (val: any) => void) => {
  createValue(val, done, inventors);
};

const profitsColumns: ITableColumn[] = [
  {
    name: 'botType',
    label: 'botType',
    field: 'botType',
    align: 'left',
  },
  {
    name: 'monthProfit',
    label: 'monthProfit',
    field: 'monthProfit',
    align: 'left',
  },
];

const { data: profits, isFetching: profitsFetching } = useQuery({
  queryKey: ['get-month-profit'],
  queryFn: () => getMonthProfitPersonal('333'),
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
});
</script>

<template>
  <q-page class="q-px-sm">
    <q-tabs
      class="q-mb-sm"
      inline-label
      v-model="report"
      active-color="primary"
      no-caps
      align="justify"
    >
      <q-tab
        v-for="(item, index) in reports"
        :key="item.value"
        :label="t('report')"
        :name="item.value"
        :icon="`filter_${index + 1}`"
      />
    </q-tabs>

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-input :label="t('query')" v-model="query" outlined dense />
      </div>

      <div
        v-if="reports.find((i) => i.value === report)?.filters.includes(FiltersEnum.SPECIFICATIONS)"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-select
          :label="t('specifications')"
          :hint="t('separateByCommaOrSemicolonOrPipe') + ' [,;|]'"
          v-model="specifications"
          use-input
          use-chips
          multiple
          @new-value="createSpecifications"
          :options="[]"
          hide-dropdown-icon
          outlined
          dense
        />
      </div>

      <div
        v-if="reports.find((i) => i.value === report)?.filters.includes(FiltersEnum.COUNTRY_CODES)"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-select
          :label="t('countryCodes')"
          :hint="t('separateByCommaOrSemicolonOrPipe') + ' [,;|]'"
          v-model="countryCodes"
          use-input
          use-chips
          multiple
          @new-value="createCountryCodes"
          :options="[]"
          hide-dropdown-icon
          outlined
          dense
        />
      </div>

      <div
        v-if="reports.find((i) => i.value === report)?.filters.includes(FiltersEnum.ASSIGNEES)"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-select
          :label="t('assignees')"
          :hint="t('separateByCommaOrSemicolonOrPipe') + ' [,;|]'"
          v-model="assignees"
          use-input
          use-chips
          multiple
          @new-value="createAssignees"
          :options="[]"
          hide-dropdown-icon
          outlined
          dense
        />
      </div>

      <div
        v-if="reports.find((i) => i.value === report)?.filters.includes(FiltersEnum.INVENTORS)"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-select
          :label="t('inventors')"
          :hint="t('separateByCommaOrSemicolonOrPipe') + ' [,;|]'"
          v-model="inventors"
          use-input
          use-chips
          multiple
          @new-value="createInventors"
          :options="[]"
          hide-dropdown-icon
          outlined
          dense
        />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-input
          hide-bottom-space
          :label="t('dateFrom')"
          outlined
          dense
          no-error-icon
          v-model="dateFrom"
          mask="date"
          lazy-rules="ondemand"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFrom">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-input
          hide-bottom-space
          :label="t('dateTo')"
          lazy-rules="ondemand"
          outlined
          dense
          no-error-icon
          v-model="dateTo"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateTo">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width full-height"
          outline
          :label="t('search')"
          color="primary"
          no-caps
          icon-right="search"
        />
      </div>
    </div>

    <app-table
      :loading="profitsFetching"
      :columns="profitsColumns"
      :rows="profits || []"
      :row-key="(row) => row.botType"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold">
            {{ t(col.label) }}
          </q-th>
          <q-th auto-width>
            <q-btn class="text-bold" outline no-caps icon="add" color="primary" />
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props" class="cursor-pointer">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'botType'">
              <bot-type :bot-type="col.value" />
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
          <q-td auto-width class="text-right">
            <q-btn size="sm" color="primary" round dense icon="edit" class="q-mr-sm" />

            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click.stop="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%"> </q-td>
        </q-tr>
      </template>
    </app-table>

    <table-loading class="q-mt-xs" v-if="profitsFetching" />

    <no-records v-if="!profits?.length && !profitsFetching" class="q-mt-xs" />
  </q-page>
</template>

<i18n>
{
  "uk": {
    "report": "Звіт",
    "specifications": "Специфікації",
    "separateByCommaOrSemicolonOrPipe": "Розділіть множинні значення через",
    "query": "Запит",
    "countryCodes": "Коди країн",
    "assignees": "Правонаступники",
    "inventors": "Винахідники",
    "dateFrom": "Дата з",
    "dateTo": "Дата до",
    "search": "Пошук"
  }
}
</i18n>
