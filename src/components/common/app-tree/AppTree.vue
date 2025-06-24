<script setup lang="ts">
import TreeNode from 'components/common/tree-node/TreeNode.vue';
import { useI18n } from 'vue-i18n';
import {
  BASE_EMAIL_COL_WIDTH,
  BASE_LINE_COL_WIDTH,
  DEPOSIT_AMOUNT_COL_MR,
  DEPOSIT_AMOUNT_COL_WIDTH,
  LEAD_LEVEL_TEAM_TURNOVER_COL_MR,
  LEAD_LEVEL_TEAM_TURNOVER_COL_WIDTH,
  LEVEL_COL_MR,
  LEVEL_COL_WIDTH,
  REG_DATE_COL_MR,
  REG_DATE_COL_WIDTH,
  TEAM_TURNOVER_COL_MR,
  TEAM_TURNOVER_COL_WIDTH,
  TOTAL_RECEIVED_TURNOVER_COL_WIDTH,
} from 'src/utils/consts';
import type { ITreeNode } from 'src/types/referral/ITreeNode';

interface IProps {
  nodes: ITreeNode[];
}
defineProps<IProps>();

const BASE_DEPTH = 1;
const { t } = useI18n();
</script>

<template>
  <div class="app-tree">
    <div class="app-tree__head">
      <div
        class="node-tree-head__cell q-pl-sm"
        :style="{
          flex: `0 0 ${BASE_LINE_COL_WIDTH}px`,
        }"
      >
        {{ t('line') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${BASE_EMAIL_COL_WIDTH}px`,
        }"
      >
        {{ t('email') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${REG_DATE_COL_WIDTH}px`,
          marginRight: `${REG_DATE_COL_MR}px`,
        }"
      >
        {{ t('regDate') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${LEVEL_COL_WIDTH}px`,
          marginRight: `${LEVEL_COL_MR}px`,
        }"
      >
        {{ t('level') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${DEPOSIT_AMOUNT_COL_WIDTH}px`,
          marginRight: `${DEPOSIT_AMOUNT_COL_MR}px`,
        }"
      >
        {{ t('deposit') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${TEAM_TURNOVER_COL_WIDTH}px`,
          marginRight: `${TEAM_TURNOVER_COL_MR}px`,
        }"
      >
        {{ t('teamTurnover') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${LEAD_LEVEL_TEAM_TURNOVER_COL_WIDTH}px`,
          marginRight: `${LEAD_LEVEL_TEAM_TURNOVER_COL_MR}px`,
        }"
      >
        <q-btn size="xs" class="icon-btn no-padding" flat>
          <q-icon name="info" color="primary" />
          <q-tooltip
            class="tooltip ft-extrabold items-center flex"
            anchor="center end"
            self="center start"
          >
            <span>{{ t('leadLevelTeamTurnover') }}</span>
          </q-tooltip>
        </q-btn>
        {{ t('upturn') }}
      </div>

      <div
        class="node-tree-head__cell"
        :style="{
          flex: `0 0 ${TOTAL_RECEIVED_TURNOVER_COL_WIDTH}px`,
        }"
      >
        <q-btn size="xs" class="icon-btn no-padding" flat>
          <q-icon name="info" color="primary" />
          <q-tooltip
            class="tooltip ft-extrabold items-center flex"
            anchor="center end"
            self="center start"
          >
            <span>{{ t('totalReceivedTurnover') }}</span>
          </q-tooltip>
        </q-btn>
        {{ t('revenue') }}
      </div>
    </div>
    <tree-node
      v-for="(node, index) in nodes"
      :key="node.id"
      :is-root="true"
      :is-first="index === 0"
      :is-last="index === nodes.length - 1"
      :node="node"
      :depth="BASE_DEPTH"
    />
  </div>
</template>

<style scoped lang="scss">
@import 'app-tree';
</style>
