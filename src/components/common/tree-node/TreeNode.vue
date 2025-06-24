<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus } from 'src/composable/useEventBus';
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
import TetherIconSvg from 'components/icons/TetherIconSvg.vue';
import { Decimal } from 'decimal.js';
import type { ITreeNode } from 'src/types/referral/ITreeNode';
import { timestamp } from 'src/composable/Timestamp';
import { EventsEnum } from 'src/enums/common/EventsEnum';
import DefaultUserSvg from 'assets/svg/default-user.svg';
import TelegramSvg from 'components/icons/TelegramSvg.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

interface IProps {
  node: ITreeNode;
  depth: number;
  isLast: boolean;
  isFirst: boolean;
  isRoot: boolean;
}

const props = defineProps<IProps>();
const expanded = ref(false);
const { emit } = useEventBus();
const $q = useQuasar();
const { t } = useI18n();

const loadMoreNodes = () => {
  if (props.depth === 15) return;
  expanded.value = !expanded.value;
  if (props.node.loading || !props.node.hasChildren) return;

  if (!props.node?.children?.length) {
    emit(EventsEnum.LAZY_LOAD, props.node);
  }
};

const onCopyClick = async (text: string) => {
  await copyToClipboard(text);
  $q.notify({
    type: 'positive',
    position: 'top-right',
    message: t('copiedToClipboard'),
    timeout: 2000,
    progress: true,
  });
};
</script>
<template>
  <div class="tree-node" :class="{ 'tree-node--root': isRoot, 'tree-node--last': isLast }">
    <div class="flex items-center">
      <div
        :style="{
          flex: `0 0 ${BASE_LINE_COL_WIDTH}px`,
        }"
      >
        <div class="tree-node__depth" @click="loadMoreNodes">
          <template v-if="!node.loading">
            {{ depth }}
            <q-icon
              v-if="(node.hasChildren || node.children?.length) && depth < 15"
              :name="expanded ? 'expand_less' : 'expand_more'"
            />
          </template>
          <template v-else>
            <q-spinner size="xs" />
          </template>
        </div>
      </div>

      <div
        class="flex"
        :style="{
          flex: `0 0 ${BASE_EMAIL_COL_WIDTH}px`,
        }"
      >
        <q-avatar size="sm" class="q-mr-sm">
          <q-img :src="node.avatarUrl || DefaultUserSvg" />
        </q-avatar>
        <div>
          <div>
            {{ node.email }}
          </div>
          <div
            v-if="node.phoneNumber || node.telegramNickname"
            class="text-caption text-secondary flex items-center"
          >
            <telegram-svg v-if="node.telegramNickname" fill="#717680" :width="14" :height="10" />
            <q-icon v-if="node.phoneNumber" name="call" />

            <a
              :href="
                node.phoneNumber
                  ? `tel:${node.phoneNumber}`
                  : `https://t.me/${node.telegramNickname}`
              "
              :target="node.phoneNumber ? '_self' : '_blank'"
              class="q-ml-xs"
            >
              {{ node.phoneNumber || node.telegramNickname }}
            </a>

            <q-btn
              color="secondary"
              dense
              flat
              class="q-ml-xs"
              @click="onCopyClick((node.phoneNumber || node.telegramNickname) as string)"
            >
              <q-icon size="11px" name="content_copy" />
            </q-btn>
          </div>
        </div>
      </div>

      <div
        class="flex no-wrap"
        :style="{
          flex: '1 0 auto',
          transform: `translateX(-${depth * 22 - 22}px)`,
        }"
      >
        <div
          :style="{
            flex: `0 0 ${REG_DATE_COL_WIDTH}px`,
            marginRight: `${REG_DATE_COL_MR}px`,
          }"
        >
          {{ timestamp(node.registeredAt).split(' ')[0] }}
        </div>
        <div
          :style="{
            flex: `0 0 ${LEVEL_COL_WIDTH}px`,
            marginRight: `${LEVEL_COL_MR}px`,
          }"
        >
          {{ node.level }}
        </div>
        <div
          :style="{
            flex: `0 0 ${DEPOSIT_AMOUNT_COL_WIDTH}px`,
            marginRight: `${DEPOSIT_AMOUNT_COL_MR}px`,
          }"
        >
          {{ new Decimal(node.depositAmount).toDP(2).toString() }}
          <tether-icon-svg />
        </div>
        <div
          :style="{
            flex: `0 0 ${TEAM_TURNOVER_COL_WIDTH}px`,
            marginRight: `${TEAM_TURNOVER_COL_MR}px`,
          }"
        >
          {{ new Decimal(node.teamTurnover).toDP(2).toString() }}
          <tether-icon-svg />
        </div>
        <div
          :style="{
            flex: `0 0 ${LEAD_LEVEL_TEAM_TURNOVER_COL_WIDTH}px`,
            marginRight: `${LEAD_LEVEL_TEAM_TURNOVER_COL_MR}px`,
          }"
        >
          <span
            :class="{
              'clr-positive': node.availableToTopUpLevel,
              'clr-negative': !node.availableToTopUpLevel,
            }"
          >
            {{ new Decimal(node.leadLevelTeamTurnover).toDP(2).toString() }}
            <tether-icon-svg />
          </span>
        </div>
        <div
          :style="{
            flex: `0 0 ${TOTAL_RECEIVED_TURNOVER_COL_WIDTH}px`,
          }"
        >
          {{ new Decimal(node.totalReceivedTurnover).toDP(2).toString() }}
          <tether-icon-svg />
        </div>
      </div>
    </div>
    <div
      v-if="!(isRoot && isLast && isFirst)"
      class="tree-node__connector tree-node__connector--vertical"
      :class="{
        'tree-node__connector--vertical--top-root': isRoot && isFirst,
        'tree-node__connector--vertical--bottom-root': isRoot && isLast,
        'tree-node__connector--vertical--first': isFirst && !isRoot,
        'tree-node__connector--vertical--last': isLast && !isRoot,
      }"
    />

    <div
      v-if="!(isRoot && isLast && isFirst)"
      class="tree-node__connector tree-node__connector--horizontal"
    />

    <div v-show="expanded">
      <tree-node
        v-for="(child, index) in node?.children || []"
        :node="child"
        :key="child.id"
        :depth="depth + 1"
        :is-first="index === 0"
        :is-last="(node.children?.length || 0) - 1 === index"
        :is-root="false"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'tree-node';
</style>

<i18n>
{
  "en": {
    "copiedToClipboard": "Copied to clipboard"
  }
}
</i18n>
