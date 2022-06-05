<script lang='ts' setup>
import { useWeekListSettingsStore } from '@/store/weekListSettings.store'

const settingsStore = useWeekListSettingsStore()

function handleOpenClick() {
  settingsStore.setShowSettings(true)
}
</script>

<template>
  <div class="fixed right-0 top-64 flex items-center">
    <div
      class="flex bg-white/80 justify-center items-center text-lg w-[50px] h-[50px] settings rounded-l-full rounded-tr-full"
      @click="handleOpenClick"
    >
      <div class="spin">
        <van-icon name="setting-o" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.settings {
  box-shadow: -12px 12px 32px -4px rgb(99 115 129 / 36%);
}
.spin {
  animation: spin ease-in-out infinite 3s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
