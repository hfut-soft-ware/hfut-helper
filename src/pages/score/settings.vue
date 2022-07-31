<script lang='ts' setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useScoreStore } from '@/store/score.store'

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
      @close="onClose"
    >
      <div class="p-5 flex flex flex-col gap-5">
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
  <div class="fixed top-64 right-0 z-[1]">
    <div
      class="settings bg-[#3F51B5] text-lg w-[50px] h-[50px] flex justify-center items-center text-white rounded-l-full rounded-tr-full"
      @click="handleScoreSettingsOpen"
    >
      <van-icon class="animate-spin" name="setting-o" />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
