<script setup lang='ts'>
import { computed, ref } from 'vue'
import SettingButton from '@/components/base/SettingButton.vue'
import type { RankMode } from '@/shared/types'

const props = defineProps<{
  rankMode: RankMode
}>()

const emits = defineEmits<{
  (e: 'update:rankMode', mode: RankMode): void
}>()

const show = ref(false)

function handleScoreSettingsOpen() {
  show.value = true
}

function onClose() {
  show.value = false
}

const checked = computed(() => props.rankMode === 'class')
function onChange() {
  if (props.rankMode === 'class') {
    emits('update:rankMode', 'major')
  } else {
    emits('update:rankMode', 'class')
  }
}
</script>

<template>
  <div class="absolute z-10">
    <van-popup
      :show="show"
      round
      closeable
      position="bottom"
      custom-style="height: 30%"
      @close="onClose"
    >
      <div class="p-5 flex flex-col gap-5">
        <h2 class="font-semibold text-base text-center">
          分数设置
        </h2>
        <div>
          <div class="flex justify-between">
            <p v-if="checked">
              教学班排名
            </p>
            <p v-else>
              专业排名
            </p>
            <van-switch :checked="checked" @change="onChange" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <SettingButton @click="handleScoreSettingsOpen" />
</template>
