<script setup lang="ts">
import AppDialog from 'components/common/app-dialog/AppDialog.vue';
import { useMutation } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { formatException } from 'src/utils/utils';
import { ref } from 'vue';
import { changeLead } from 'src/api/referral/AdminReferralApi';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import AppDialogContent from 'components/common/app-dialog-content/AppDialogContent.vue';
import AppDialogClose from 'components/common/app-dialog-close/AppDialogClose.vue';
import { useValidation } from 'src/composable/useValidation';

interface IProps {
  accountId: number;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const appDialogRef = ref();
const { requiredField } = useValidation();

const email = ref();

const { mutate: changeLeadAsync, isPending: changeLeadPending } = useMutation({
  mutationFn: changeLead,
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
  changeLeadAsync({
    email: email.value,
    accountId: props.accountId,
  });
};
</script>

<template>
  <app-dialog ref="appDialogRef">
    <app-dialog-content>
      <q-toolbar class="q-mt-sm">
        <q-toolbar-title>{{ t('changeLead') }}</q-toolbar-title>
        <q-space />
        <app-dialog-close />
      </q-toolbar>
      <app-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-input
            class="q-mb-sm"
            dense
            outlined
            type="email"
            :rules="[requiredField({})]"
            v-model="email"
            :label="t('email')"
          />

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            type="submit"
            color="primary"
            :loading="changeLeadPending"
          >
            <div class="flex items-center">
              <span>{{ t('changeLead') }}</span>
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
    "changeLead": "Change lead",
    "email": "Email"
  }
}
</i18n>
