<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppCard from 'components/common/app-card/AppCard.vue';
import AppCardSection from 'components/common/app-card-section/AppCardSection.vue';

const { t } = useI18n();
</script>

<template>
  <app-card>
    <app-card-section class="flex items-center column">
      <q-icon size="xl" color="negative" name="cancel_presentation" />
      <p class="text-bold">{{ t('noRecordsFound') }}</p>
    </app-card-section>
  </app-card>
</template>

<i18n>
{
  "uk": {
    "noRecordsFound": "Записів не знайдено"
  }
}
</i18n>
