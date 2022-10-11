<script lang='ts' setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useScoreStore } from '@/store/score.store'
import SettingButton from '@/components/base/SettingButton.vue'

const show = ref(false)

function handleScoreSettingsOpen() {
  show.value = true
}

function handleOpenCustomClick() {
  uni.navigateTo({
    url: '/sub1/pages/score/custom/custom',
  })
}

function onClose() {
  show.value = false
}

const scoreStore = useScoreStore()
const { homeScoreRankDataType } = storeToRefs(scoreStore)

const checked = computed(() => homeScoreRankDataType.value === 'all')
function onChange() {
  if (homeScoreRankDataType.value === 'compulsory') {
    homeScoreRankDataType.value = 'all'
  } else {
    homeScoreRankDataType.value = 'compulsory'
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
      :z-index="999999999"
      @close="onClose"
    >
      <div class="p-5 flex flex-col gap-5">
        <h2 class="font-semibold text-base text-center">
          分数设置
        </h2>
        <div class="flex flex-col">
          <div class="flex justify-between" @click="handleOpenCustomClick">
            <p>自定义排名</p>
            <van-icon name="arrow" />
          </div>
        </div>
        <div>
          <div class="flex justify-between">
            <p>全科排名</p>
            <van-switch :checked="checked" @change="onChange" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <SettingButton @click="handleScoreSettingsOpen" />
</template>
