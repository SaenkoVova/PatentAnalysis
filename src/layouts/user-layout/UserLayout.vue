<script setup lang="ts">
import { computed, ref } from 'vue';
import ChangeLead from 'components/referral/change-lead/ChangeLead.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { dropLead, getUserLead } from 'src/api/referral/AdminReferralApi';
import { timestamp } from 'src/composable/Timestamp';
import {
  banUser,
  deleteUser,
  enableBlockedLogin,
  getUserAvatar,
  getUserById,
  getUserId,
  twoFaOff,
  unbanUser,
  updateUserRole,
} from 'src/api/user-profile/AdminUserApi';
import { useI18n } from 'vue-i18n';
import AppCard from 'components/common/app-card/AppCard.vue';
import NowrapText from 'components/common/nowrap-text/NowrapText.vue';
import { formatException } from 'src/utils/utils';
import type { UserRolesEnum } from 'src/enums/user/UserRolesEnum';
import AppSelect from 'components/common/app-select/AppSelect.vue';
import { USER_ROLES } from 'src/utils/consts';
import { UserStatusesEnum } from 'src/enums/user/UserStatusesEnum';
import { useRouter } from 'vue-router';
import {
  userActiveBotsLink,
  userAlertsLink,
  userLimitsLink,
  userLoginHistoryLink,
  userMainWalletLink,
  userOpenOrdersLink,
  userProfitsLink,
  userReferralTreeLink,
  userSandboxInfoLink,
  patentsLink,
  userTradesLink,
  userTransactionsLink,
} from 'src/utils/links';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';
import DefaultUserSvg from 'assets/svg/default-user.svg';
import TelegramSvg from 'components/icons/TelegramSvg.vue';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const $q = useQuasar();
const { t } = useI18n();
const manageMenu = ref();
const router = useRouter();

const tabs = [
  {
    label: 'wallet',
    to: userMainWalletLink(props.userId, props.accountId),
    icon: 'account_balance_wallet',
  },
  {
    label: 'loginHistory',
    to: userLoginHistoryLink(props.userId, props.accountId),
    icon: 'meeting_room',
  },
  {
    label: 'orders',
    to: userOpenOrdersLink(props.userId, props.accountId),
    icon: 'shopping_cart',
  },
  {
    label: 'trades',
    to: userTradesLink(props.userId, props.accountId),
    icon: 'sell',
  },
  {
    label: 'transactions',
    to: userTransactionsLink(props.userId, props.accountId),
    icon: 'receipt',
  },
  {
    label: 'limits',
    to: userLimitsLink(props.userId, props.accountId),
    icon: 'assignment_late',
  },
  {
    label: 'alerts',
    to: userAlertsLink(props.userId, props.accountId),
    icon: 'notifications',
  },
  {
    label: 'referral',
    to: userReferralTreeLink(props.userId, props.accountId),
    icon: 'people',
  },
  {
    label: 'aiTrading',
    to: userActiveBotsLink(props.userId, props.accountId),
    icon: 'smart_toy',
  },
  {
    label: 'sandbox',
    to: userSandboxInfoLink(props.userId, props.accountId),
    icon: 'sports_esports',
  },
];

const userIdKey = computed(() => props.userId);
const accountIdKey = computed(() => props.accountId);

const { data: user, refetch: refetchUser } = useQuery({
  queryKey: ['get-user-by-id', { userIdKey }],
  queryFn: () => getUserById(props.userId),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const { data: avatar, isFetching: avatarFetching } = useQuery({
  queryKey: ['get-user-avatar', { userIdKey }],
  queryFn: () => getUserAvatar(props.userId),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const {
  data: userLead,
  refetch: refetchUserLead,
  isFetching: userLeadFetching,
} = useQuery({
  queryKey: ['get-user-lead', { userIdKey }],
  queryFn: () => getUserLead(accountIdKey.value),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

const userLeadUserIdReqEnabled = computed(() => !!userLead.value?.accountId);

const { data: userLeadUserId } = useQuery({
  queryKey: ['get-user-id', { userLead }],
  queryFn: () => getUserId(userLead.value?.accountId?.toString() as string),
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  enabled: userLeadUserIdReqEnabled,
});

const { mutateAsync: dropLeadAsync, isPending: dropLeadPending } = useMutation({
  mutationFn: dropLead,
  onSuccess: async () => {
    await refetchUserLead();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('leadHasBeenDeleted'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: enableBlockedLoginAsync, isPending: enableBlockedLoginPending } = useMutation({
  mutationFn: enableBlockedLogin,
  onSuccess: async () => {
    await refetchUser();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('loginHasBeenUnblocked'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: updateUserRoleAsync, isPending: updateUserRolePending } = useMutation({
  mutationFn: updateUserRole,
  onSuccess: async () => {
    await refetchUser();
    manageMenu.value.hide();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('roleChanged'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: twoFaOffAsync, isPending: twoFaOffPending } = useMutation({
  mutationFn: twoFaOff,
  onSuccess: async () => {
    await refetchUser();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('twoFaDisabled'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: banUserAsync, isPending: banUserPending } = useMutation({
  mutationFn: banUser,
  onSuccess: async () => {
    await refetchUser();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('userBanned'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: unbanUserAsync, isPending: unbanUserPending } = useMutation({
  mutationFn: unbanUser,
  onSuccess: async () => {
    await refetchUser();
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('userUnbanned'),
      timeout: 2000,
      progress: true,
    });
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const { mutateAsync: deleteUserAsync, isPending: deleteUserPending } = useMutation({
  mutationFn: deleteUser,
  onSuccess: async () => {
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('userDeleted'),
      timeout: 2000,
      progress: true,
    });
    await router.push(patentsLink());
  },
  onError: (error) => {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message: t(formatException(error)),
      timeout: 2000,
      progress: true,
    });
  },
});

const onChangeRefLeadClick = () => {
  $q.dialog({
    component: ChangeLead,
    componentProps: {
      accountId: props.accountId,
    },
  }).onOk(() => {
    refetchUserLead()
      .then(() => {})
      .catch(() => {});
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message: t('leadHasBeenChanged'),
      timeout: 2000,
      progress: true,
    });
  });
};

const onChangeUserRoleClick = async ($event: UserRolesEnum) => {
  await updateUserRoleAsync({ userId: props.userId, newRole: $event });
};

const onDisable2faClick = () => {
  $q.dialog({
    title: t('confirm'),
    message: t('areYouSureYouWantToDisable2fa'),
    cancel: {
      label: t('cancel'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    persistent: true,
  }).onOk(() => {
    twoFaOffAsync(props.userId)
      .then(() => {})
      .catch(() => {});
  });
};

const onBanUserClick = () => {
  $q.dialog({
    title: t('confirm'),
    message: t(
      user.value?.status === UserStatusesEnum.BANNED
        ? 'areYouSureYouWantToUnbanUser'
        : 'areYouSureYouWantToBanUser',
    ),
    cancel: {
      label: t('cancel'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    persistent: true,
  }).onOk(() => {
    switch (user.value?.status) {
      case UserStatusesEnum.BANNED:
        unbanUserAsync(props.userId)
          .then(() => {})
          .catch(() => {});
        break;
      default:
        banUserAsync(props.userId)
          .then(() => {})
          .catch(() => {});
    }
  });
};

const onDeleteUserClick = () => {
  $q.dialog({
    title: t('confirm'),
    message: t('areYouSureYouWantToDeleteUser'),
    cancel: {
      label: t('cancel'),
      color: 'primary',
      noCaps: true,
      outline: true,
    },
    ok: {
      label: t('ok'),
      color: 'negative',
      noCaps: true,
      outline: true,
    },
    persistent: true,
  }).onOk(() => {
    deleteUserAsync(props.userId)
      .then(() => {})
      .catch(() => {});
  });
};

const onCopyClick = async (text: string) => {
  await copyToClipboard(text);
  $q.notify({
    type: 'positive',
    position: 'top-right',
    timeout: 2000,
    progress: true,
    message: t('copiedToClipboard'),
  });
};
</script>

<template>
  <div class="layout q-pa-md">
    <div class="row q-col-gutter-xs q-mb-xs">
      <div class="col-xs-12 col-sm-4 col-md-3">
        <app-card class="full-height">
          <app-card-section class="flex items-center justify-center full-height column">
            <q-avatar size="100px" class="q-mb-md">
              <q-img v-if="!avatarFetching" :src="avatar?.url || DefaultUserSvg">
                <template #loading>
                  <q-skeleton width="100%" height="100%" type="circle" />
                </template>
              </q-img>
              <q-skeleton v-else width="100%" height="100%" type="circle" />
            </q-avatar>

            <q-btn class="full-width" outline color="primary" no-wrap no-caps>
              <q-icon name="manage_accounts" class="q-mr-sm" />
              <span class="text-bold">{{ t('manageProfile') }}</span>

              <q-menu ref="manageMenu" fit anchor="bottom left" self="top left">
                <q-list bordered separator>
                  <q-item clickable v-ripple class="flex items-center">
                    <q-icon size="md" name="admin_panel_settings" />
                    <app-select
                      :outlined="false"
                      borderless
                      :loading="updateUserRolePending"
                      :disable="updateUserRolePending"
                      hide-bottom-space
                      :label="t('role')"
                      class="full-width"
                      :flat="false"
                      :model-value="user?.role"
                      :options="USER_ROLES"
                      @update:model-value="onChangeUserRoleClick"
                    >
                      <template #selected>
                        <span class="text-bold">{{ t(user?.role || '') }}</span>
                      </template>
                      <template #option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label class="text-bold">{{ t(scope.opt) }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </app-select>
                  </q-item>

                  <q-item
                    v-close-popup
                    v-if="user?.blockedLoginUntil"
                    @click="enableBlockedLoginAsync(userId)"
                    :disable="enableBlockedLoginPending"
                    clickable
                    v-ripple
                    class="flex items-center"
                  >
                    <q-icon size="md" class="q-mr-sm" name="swipe_right" />
                    <span class="text-bold">{{ t('unblockLogin') }}</span>
                  </q-item>

                  <q-item
                    v-close-popup
                    @click="onChangeRefLeadClick"
                    clickable
                    v-ripple
                    class="flex items-center"
                  >
                    <q-icon size="md" class="q-mr-sm" name="change_circle" />
                    <span class="text-bold">{{ t('changeReferralLead') }}</span>
                  </q-item>

                  <q-item
                    :disable="banUserPending || unbanUserPending"
                    v-close-popup
                    clickable
                    v-ripple
                    class="flex items-center"
                    @click="onBanUserClick"
                  >
                    <q-icon
                      color="negative"
                      size="md"
                      class="q-mr-sm"
                      :name="
                        user?.status !== UserStatusesEnum.BANNED
                          ? 'person_remove_alt_1'
                          : 'person_add_alt_1'
                      "
                    />
                    <span class="text-bold text-negative">{{
                      t(user?.status !== UserStatusesEnum.BANNED ? 'banUser' : 'unbanUser')
                    }}</span>
                  </q-item>

                  <q-item
                    v-if="user?.twoFaLogin"
                    v-close-popup
                    :disable="twoFaOffPending"
                    @click="onDisable2faClick"
                    clickable
                    v-ripple
                    class="flex items-center"
                  >
                    <q-icon color="negative" size="md" class="q-mr-sm" name="no_encryption" />
                    <span class="text-bold text-negative">{{ t('disable2fa') }}</span>
                  </q-item>

                  <q-item
                    v-if="userLead?.accountId"
                    v-close-popup
                    @click="dropLeadAsync(accountId)"
                    :disable="dropLeadPending"
                    clickable
                    v-ripple
                    class="flex items-center"
                  >
                    <q-icon color="negative" size="md" class="q-mr-sm" name="delete_forever" />
                    <span class="text-bold text-negative">{{ t('deleteReferralLead') }}</span>
                  </q-item>

                  <q-item
                    v-close-popup
                    @click="onDeleteUserClick"
                    :disable="deleteUserPending"
                    clickable
                    v-ripple
                    class="flex items-center"
                  >
                    <q-icon color="negative" size="md" class="q-mr-sm" name="person_off" />
                    <span class="text-bold text-negative">{{ t('deleteUser') }}</span>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </app-card-section>
        </app-card>
      </div>

      <div class="col-xs-12 col-sm">
        <div class="row q-col-gutter-xs">
          <div class="col-xs-6 col-sm-6 col-md-4">
            <app-card>
              <app-card-section>
                <p>{{ t('email') }}</p>
                <p>
                  <template v-if="user">
                    {{ user.email }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-4">
            <app-card>
              <app-card-section>
                <p>{{ t('registered') }}</p>
                <p>
                  <template v-if="user">
                    <nowrap-text>
                      {{ timestamp(user.registered) }}
                    </nowrap-text>
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-4">
            <app-card>
              <app-card-section>
                <nowrap-text>
                  {{ t('failedLoginAttempts') }}
                </nowrap-text>
                <p>
                  <template v-if="user">
                    {{ user.failedLoginAttempts }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-4">
            <app-card>
              <app-card-section>
                <nowrap-text>{{ t('mailConfirmLogin') }}</nowrap-text>
                <p>
                  <template v-if="user">
                    {{ t(user.mailConfirmLogin ? 'enabled' : 'disabled') }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-5 col-md-4">
            <app-card>
              <app-card-section>
                <p>{{ t('referralLead') }}</p>
                <div class="flex no-wrap" style="height: 21px">
                  <template v-if="!userLeadFetching">
                    <q-avatar size="21px" class="q-mr-xs">
                      <q-img :src="userLead?.avatarUrl || DefaultUserSvg">
                        <template #loading>
                          <q-skeleton width="100%" height="100%" type="circle" />
                        </template>
                      </q-img>
                    </q-avatar>
                    <nowrap-text>
                      <router-link
                        :class="{
                          'text-underline': userLeadUserId && userLead?.accountId,
                        }"
                        :style="{
                          pointerEvents: !userLeadUserId || !userLead?.accountId ? 'none' : 'auto',
                        }"
                        :to="
                          userProfitsLink(
                            userLeadUserId as string,
                            userLead?.accountId?.toString() as string,
                          )
                        "
                      >
                        {{ userLead?.email || '-' }}
                      </router-link>
                    </nowrap-text>
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </div>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-7 col-md-4">
            <app-card>
              <app-card-section>
                <nowrap-text>{{ t('loginIsBlockedUntil') }}</nowrap-text>
                <p>
                  <template v-if="user">
                    {{ user.blockedLoginUntil ? timestamp(user.blockedLoginUntil) : '-' }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-6 col-md-3">
            <app-card>
              <app-card-section>
                <p>{{ t('phoneNumber') }}</p>
                <p>
                  <template v-if="user">
                    <q-icon name="call" class="q-mr-xs" />
                    <a
                      :class="{ 'text-underline': user.phoneNumber }"
                      :href="user.phoneNumber ? `tel:${user.phoneNumber}` : '#'"
                    >
                      {{ user.phoneNumber || '-' }}
                    </a>

                    <q-btn
                      v-if="user.phoneNumber"
                      dense
                      size="xs"
                      flat
                      class="q-ml-xs"
                      icon="content_copy"
                      @click="onCopyClick(user.phoneNumber)"
                    />
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-6 col-md-3">
            <app-card>
              <app-card-section>
                <p>{{ t('telegramNickname') }}</p>
                <div class="flex items-center">
                  <template v-if="user">
                    <telegram-svg />
                    <a
                      :target="user.telegramNickname ? '_blank' : '_self'"
                      :class="{ 'text-underline': user.telegramNickname }"
                      class="q-ml-xs"
                      :href="user.telegramNickname ? `https://t.me/${user.telegramNickname}` : '#'"
                    >
                      {{ user.telegramNickname || '-' }}
                    </a>
                    <q-btn
                      v-if="user.telegramNickname"
                      dense
                      size="xs"
                      flat
                      class="q-ml-xs"
                      icon="content_copy"
                      @click="onCopyClick(user.telegramNickname)"
                    />
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </div>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-4 col-md-2">
            <app-card>
              <app-card-section>
                <p>{{ t('role') }}</p>
                <p>
                  <template v-if="user">
                    {{ t(user.role) }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-4 col-md-2">
            <app-card>
              <app-card-section>
                <p>{{ t('status') }}</p>
                <p>
                  <template v-if="user">
                    {{ t(user.status) }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>

          <div class="col-xs-4 col-md-2">
            <app-card>
              <app-card-section>
                <p>{{ t('2fa') }}</p>
                <p>
                  <template v-if="user">
                    {{ t(user.twoFaLogin ? 'enabled' : 'disabled') }}
                  </template>
                  <template v-else>
                    <q-skeleton type="text" />
                  </template>
                </p>
              </app-card-section>
            </app-card>
          </div>
        </div>
      </div>
    </div>

    <q-tabs active-color="primary" inline-label class="q-mb-sm">
      <q-route-tab
        no-caps
        v-for="(item, idx) in tabs"
        :key="idx"
        :label="t(item.label)"
        :to="item.to"
        :icon="item.icon"
        :exact="false"
      />
    </q-tabs>

    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import 'user-layout';
</style>

<i18n>
{
  "en": {
    "email": "Email",
    "registered": "Registered",
    "failedLoginAttempts": "Failed login attempts",
    "mailConfirmLogin": "Mail confirm login",
    "loginIsBlockedUntil": "Login blocked until",
    "role": "Role",
    "status": "Status",
    "2fa": "2FA",
    "disabled": "Disabled",
    "enabled": "Enabled",
    "manageProfile": "Manage profile",
    "referralLead": "Referral lead",
    "unblockLogin": "Unblock login",
    "changeReferralLead": "Change referral lead",
    "deleteReferralLead": "Delete referral lead",
    "isAdmin": "Is admin",
    "roleChanged": "User role has been changed",
    "leadHasBeenDeleted": "Referral lead has been deleted",
    "loginHasBeenUnblocked": "Login has been unblocked",
    "leadHasBeenChanged": "Referral lead has been changed",
    "disable2fa": "Disabled 2FA",
    "confirm": "Confirm",
    "areYouSureYouWantToDisable2fa": "Are you sure you want to disable 2FA?",
    "twoFaDisabled": "2FA has been disabled",
    "ok": "Ok",
    "cancel": "Cancel",
    "banUser": "Ban user",
    "unbanUser": "Unban user",
    "areYouSureYouWantToBanUser": "Are you sure you want to ban user?",
    "areYouSureYouWantToUnbanUser": "Are you sure you want to unban user?",
    "userBanned": "User has been banned",
    "userUnbanned": "User has been unbanned",
    "userDeleted": "User has been deleted",
    "areYouSureYouWantToDeleteUser": "Are you sure you want to delete user?",
    "deleteUser": "Delete user",
    "wallet": "Wallet",
    "sandbox": "Sandbox",
    "loginHistory": "Login history",
    "orders": "Orders",
    "transactions": "Transactions",
    "alerts": "Alerts",
    "referral": "Referral",
    "aiTrading": "AI trading",
    "trades": "Trades",
    "phoneNumber": "Phone number",
    "telegramNickname": "Tg nickname",
    "copiedToClipboard": "Copied to clipboard"
  }
}
</i18n>
