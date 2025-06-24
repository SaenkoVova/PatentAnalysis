<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { userSandboxBetsLink, userSandboxInfoLink } from 'src/utils/links';

interface IProps {
  userId: string;
  accountId: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const tabs = [
  {
    label: 'info',
    to: userSandboxInfoLink(props.userId, props.accountId),
    icon: 'info',
  },
  {
    label: 'bets',
    to: userSandboxBetsLink(props.userId, props.accountId),
    icon: 'casino',
  },
];
</script>

<template>
  <div>
    <q-tabs active-color="primary" inline-label class="q-mb-sm" align="left">
      <q-route-tab
        no-caps
        v-for="(item, idx) in tabs"
        :key="idx"
        :label="t(item.label)"
        :to="item.to"
        :icon="item.icon"
      />
    </q-tabs>
    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "info": "Info",
    "bets": "Bets"
  }
}
</i18n>
