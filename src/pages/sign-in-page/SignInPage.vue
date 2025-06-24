<script setup lang="ts">
import { ref } from 'vue';
import { logIn } from 'src/api/user-profile/AdminAuthApi';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { useValidation } from 'src/composable/useValidation';
import { useQuasar } from 'quasar';
import { useMutation } from '@tanstack/vue-query';
import { homeLink } from 'src/utils/links';
import { LocalStorageKeysEnum } from 'src/enums/common/LocalStorageKeysEnum';

const { t } = useI18n();
const router = useRouter();
const { requiredField } = useValidation();
const $q = useQuasar();

const email = ref();
const password = ref();
const isPasswordVisible = ref(false);

const { mutateAsync: logInAsync, isPending: logInPending } = useMutation({
  mutationFn: logIn,
});

const onLoginClick = async () => {
  const deviceId = uuidv4();
  localStorage.setItem(LocalStorageKeysEnum.DEVICE_ID, deviceId);

  const response = await logInAsync({
    deviceId,
    email: email.value.toLowerCase(),
    password: password.value,
  });

  const authStore = useAuthStore();
  authStore.setIsAuthorized(response);

  const path = router.options.history.state.back;

  if (path) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    await router.push({ path: path.toString() });
  } else {
    await router.push(homeLink());
  }
};
</script>

<template>
  <q-page class="page">
    <div class="row page__container">
      <div v-if="!$q.screen.xs && !$q.screen.sm" class="col-md-7 page__banner"></div>
      <div class="col-xs-12 col-md-5 flex justify-center items-center q-px-md">
        <q-form class="page__form" @submit.prevent="onLoginClick">
          <p class="page__title text-bold">{{ t('logIn') }}</p>
          <p class="page__subtitle text-secondary">{{ t('welcomeBack') }}</p>
          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            type="email"
            v-model.trim="email"
            :label="t('email')"
          />

          <q-input
            :rules="[requiredField({})]"
            outlined
            dense
            class="q-mb-sm"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
            :label="t('password')"
          >
            <template #append>
              <q-btn
                flat
                dense
                round
                ripple
                @click="isPasswordVisible = !isPasswordVisible"
                :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
              />
            </template>
          </q-input>

          <q-btn
            class="full-width text-bold"
            outline
            no-caps
            :loading="logInPending"
            size="lg"
            type="submit"
            color="primary"
            :label="t('logIn')"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
@import 'sign-in';
</style>

<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password",
    "logIn": "Log in",
    "welcomeBack": "Welcome Back! Please enter your registered Email ID"
  }
}
</i18n>
