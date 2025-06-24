<script setup lang="ts">
import { coinIcons } from 'src/utils/coinIcons';
const getIcon = (nameOfTheCurrencyShort: string) => {
  return coinIcons[nameOfTheCurrencyShort];
};

defineProps<{
  coin: string;
}>();
</script>

<template>
  <div class="icon-with-label">
    <div class="icon-with-label__image">
      <q-img :src="getIcon(coin)" class="fit" />
    </div>
    <div class="icon-with-label__text">
      {{ coin }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'coin-with-icon';
</style>
