<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { useValidation } from 'src/composable/useValidation';
import type { IGameConfig } from 'src/types/game/IGameConfig';
import type { IBalancingData } from 'src/types/game/IBalancingData';
import { changeBotSettings } from 'src/api/game/AdminApi';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';

interface IProps {
  config: IGameConfig;
  balancingData: IBalancingData;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const { requiredField } = useValidation();
const appDialogRef = ref();

const betValue = ref();
const targetValue = ref();

const availableTargets = ref(props.config.availableTargets);
const availableBetNumbers = ref(props.config.availableBetNumbers);
const maxOneSidePlayers = ref(props.config.maxOneSidMaxPlayers);
const minOneSidePlayers = ref(props.config.minOneSidMaxPlayers);
const systemLose = ref(props.config.systemLose);

const { mutateAsync: changeBotSettingsAsync, isPending: changeBotSettingsPending } = useMutation({
  mutationFn: changeBotSettings,
});

const onSubmit = async () => {
  try {
    await changeBotSettingsAsync({
      availableTargets: availableTargets.value,
      availableBetNumbers: availableBetNumbers.value,
      maxOneSidePlayers: maxOneSidePlayers.value,
      minOneSidePlayers: minOneSidePlayers.value,
      systemLose: systemLose.value,
    });
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('botSettingsChanged'),
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

const addBetValue = () => {
  availableBetNumbers.value.push(+betValue.value);
  betValue.value = '';
};

const addTargetValue = () => {
  availableTargets.value.push(+targetValue.value);
  targetValue.value = '';
};

const removeBetValue = (val: number) => {
  availableBetNumbers.value = availableBetNumbers.value.filter((i) => i !== val);
};

const removeTargetValue = (val: number) => {
  availableTargets.value = availableTargets.value.filter((i) => i !== val);
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('changeBotSettings') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section class="q-pa-sm">
        <q-form greedy @submit.prevent="onSubmit">
          <div class="q-mb-xs flex items-center">
            <p class="q-mr-sm">{{ t('availableBetNumbers') }}:</p>
            <q-chip
              color="primary"
              outline
              v-for="(item, index) in availableBetNumbers"
              :key="index"
              :label="item"
              clickable
              icon-right="close"
              @click="removeBetValue(item)"
            />
          </div>

          <q-input
            type="number"
            :label="t('betValue')"
            outlined
            dense
            class="full-width q-mb-md"
            v-model="betValue"
          >
            <template #append>
              <q-btn
                icon="add"
                color="primary"
                class="no-padding"
                @click="addBetValue"
                flat
                dense
              />
            </template>
          </q-input>

          <div class="q-mb-sm flex items-center">
            <p class="q-mr-sm">{{ t('availableTargets') }}:</p>
            <q-chip
              outline
              color="primary"
              v-for="(item, index) in availableTargets"
              :key="index"
              :label="item"
              clickable
              icon-right="close"
              @click="removeTargetValue(item)"
            />
          </div>

          <div class="flex no-wrap q-mb-md">
            <q-input
              dense
              class="full-width"
              type="number"
              :label="t('targetValue')"
              outlined
              v-model="targetValue"
            >
              <template #append>
                <q-btn
                  color="primary"
                  class="no-padding"
                  flat
                  dense
                  @click="addTargetValue"
                  icon="add"
                />
              </template>
            </q-input>
          </div>

          <q-input
            :rules="[requiredField({})]"
            dense
            type="number"
            :label="t('maxOneSidePlayers')"
            outlined
            v-model="maxOneSidePlayers"
          />

          <q-input
            :rules="[requiredField({})]"
            type="number"
            dense
            :label="t('minOneSidePlayers')"
            outlined
            v-model="minOneSidePlayers"
          />

          <q-input
            :rules="[requiredField({})]"
            dense
            type="number"
            :label="t('systemLose')"
            outlined
            v-model="systemLose"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="changeBotSettingsPending"
          >
            <div class="flex items-center">
              <span>{{ t('changeBotSettings') }}</span>
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
    "changeBotSettings": "Change bot settings",
    "availableBetNumbers": "Available bets numbers",
    "betValue": "Bet value",
    "availableTargets": "Available targets",
    "targetValue": "Target value",
    "minOneSidePlayers": "Minimum side players",
    "maxOneSidePlayers": "Maximum side players",
    "systemLose": "System lose",
    "botSettingsChanged": "Bot settings changed"
  }
}
</i18n>
