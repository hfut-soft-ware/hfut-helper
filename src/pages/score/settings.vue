<script lang='ts' setup>
import { ref } from 'vue'

const show = ref(false)

function handleScoreSettingsOpen() {
  show.value = true
}

function handleOpenCustomClick() {
  uni.navigateTo({
    url: '/pages/score/custom/custom',
  })
}

function onClose() {
  show.value = false
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
