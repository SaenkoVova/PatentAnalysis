<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';
import { changeWithdrawLimit } from 'src/api/user-profile/SuperAdminApi';

interface IProps {
  accounts: number[];
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField, moreThan } = useValidation();

const requestedWithdrawLimit = ref();

const { mutate: changeWithdrawLimitAsync, isPending: changeWithdrawLimitPending } = useMutation({
  mutationFn: changeWithdrawLimit,
  onSuccess() {
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('withdrawLimitUpdated'),
      timeout: 2000,
      progress: true,
    });
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
  changeWithdrawLimitAsync({
    requestedWithdrawLimit: requestedWithdrawLimit.value,
    accounts: props.accounts,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('updateWithdrawLimit') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form greedy @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({}), moreThan(0, {})]"
            class="q-mb-md"
            outlined
            dense
            type="number"
            v-model="requestedWithdrawLimit"
            :label="t('requestedWithdrawLimit')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="changeWithdrawLimitPending"
          >
            <div class="flex items-center">
              <span>{{ t('updateWithdrawLimit') }}</span>
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
    "updateWithdrawLimit": "Update withdraw limit",
    "requestedWithdrawLimit": "Requested withdraw limit",
    "withdrawLimitUpdated": "Withdraw limit updated"
  }
}
</i18n>
