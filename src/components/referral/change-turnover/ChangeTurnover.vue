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
import { changeTurnover } from 'src/api/referral/AdminReferralApi';

interface IProps {
  accountId: string;
  turnover: number;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField } = useValidation();

const turnover = ref(props.turnover);

const { mutate: changeTurnoverAsync, isPending: changeTurnoverPending } = useMutation({
  mutationFn: changeTurnover,
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
  changeTurnoverAsync({
    turnover: turnover.value,
    accountId: props.accountId,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('changeTurnover') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form greedy @submit.prevent="onSubmit">
          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="number"
            v-model="turnover"
            :label="t('turnover')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="changeTurnoverPending"
          >
            <div class="flex items-center">
              <span>{{ t('changeTurnover') }}</span>
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
    "changeTurnover": "Change turnover",
    "turnover": "Turnover"
  }
}
</i18n>
