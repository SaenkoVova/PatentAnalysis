<script setup lang="ts">
import { patentsLink } from 'src/utils/links';
import { useI18n } from 'vue-i18n';

interface IProps {
  showTooltip: boolean;
}

defineProps<IProps>();

const { t } = useI18n();

const nav = [
  {
    label: 'patents',
    to: patentsLink(),
    icon: 'emoji_objects',
  },
];
</script>

<template>
  <q-list>
    <q-item v-for="(item, idx) in nav" :key="idx" clickable v-ripple :to="item.to">
      <q-tooltip v-if="showTooltip" anchor="center right" self="center left">
        {{ t(item.label) }}
      </q-tooltip>
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>
        {{ t(item.label) }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<i18n>
{
  "uk": {
    "patents": "Патенти"
  }
}
</i18n>
