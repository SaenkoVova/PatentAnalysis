<script setup lang="ts">
import { Decimal } from 'decimal.js';
import TetherIconSvg from 'components/icons/TetherIconSvg.vue';

interface IProps {
  value: number;
}

defineProps<IProps>();
</script>
<template>
  <div>
    <span>{{ new Decimal(value).toDP(2) }}</span>
    <tether-icon-svg />
  </div>
</template>
