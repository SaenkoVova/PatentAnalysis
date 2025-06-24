<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import type { ILevelSetting } from 'src/types/referral/ILevelSetting';
import { updateLevelSetting } from 'src/api/referral/AdminReferralLevelApi';
import { useValidation } from 'src/composable/useValidation';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';

interface IProps {
  levelSetting: ILevelSetting;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const level = ref(props.levelSetting.level);
const teamTurnover = ref(props.levelSetting.teamTurnover);
const personalDeposit = ref(props.levelSetting.personalDeposit);
const commission = ref(props.levelSetting.commission);
const sameLevelCommission = ref(props.levelSetting.sameLevelCommission);
const premium = ref(props.levelSetting.premium);

const {
  mutate: updateLevelSettingAsync,
  isPending: updateLevelSettingPending,
} = useMutation({
  mutationFn: updateLevelSetting,
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
  updateLevelSettingAsync({
    level: level.value,
    teamTurnover: teamTurnover.value,
    personalDeposit: personalDeposit.value,
    commission: commission.value,
    sameLevelCommission: sameLevelCommission.value,
    premium: premium.value,
    id: props.levelSetting.id,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <app-card-section>
        <q-toolbar class="q-mt-sm">
          <q-toolbar-title>{{ t('updateLevel') }}</q-toolbar-title>
          <q-space />
          <app-dialog-close />
        </q-toolbar>
        <q-form greedy @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="level"
            :label="t('level')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="teamTurnover"
            :label="t('teamTurnover')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="personalDeposit"
            :label="t('personalDeposit')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="commission"
            :label="t('commission')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="sameLevelCommission"
            :label="t('sameLevelCommission')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="premium"
            :label="t('premium')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="updateLevelSettingPending"
          >
            <div class="flex items-center">
              <span>{{ t('updateLevel') }}</span>
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
    "level": "Level",
    "teamTurnover": "Team turnover",
    "personalDeposit": "Personal deposit",
    "commission": "Fee",
    "premium": "Premium",
    "updateLevel": "Update level",
    "sameLevelCommission": "Same level fee",
  }
}
</i18n>
