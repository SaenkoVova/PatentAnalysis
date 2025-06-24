<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { createLevelSetting } from 'src/api/referral/AdminReferralLevelApi';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const level = ref();
const teamTurnover = ref();
const personalDeposit = ref();
const commission = ref();
const sameLevelCommission = ref();
const premium = ref();

const {
  mutate: createLevelSettingAsync,
  isPending: createLevelSettingPending,
} = useMutation({
  mutationFn: createLevelSetting,
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
  createLevelSettingAsync({
    level: level.value,
    teamTurnover: teamTurnover.value,
    personalDeposit: personalDeposit.value,
    commission: commission.value,
    sameLevelCommission: sameLevelCommission.value,
    premium: premium.value,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('createLevel') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
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
            :loading="createLevelSettingPending"
          >
            <div class="flex items-center">
              <span>{{ t('createLevel') }}</span>
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
    "createLevel": "Create level",
    "sameLevelCommission": "Same level fee",
  }
}
</i18n>
