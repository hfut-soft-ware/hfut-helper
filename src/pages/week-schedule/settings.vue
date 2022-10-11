<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useWeekListSettingsStore } from '@/store/weekListSettings.store'
import { useCourseSearchStore } from '@/store/courseSearch.store'

const settingsStore = useWeekListSettingsStore()

const searchCourseStore = useCourseSearchStore()
const { mode } = storeToRefs(searchCourseStore)

function handleOpenClick() {
  if (mode.value === 'normal') {
    settingsStore.setShowSettings(true)
  } else {
    searchCourseStore.openSetting()
  }
}
</script>

<template>
  <div class="fixed right-0 top-64 flex items-center z-[99] opacity-60">
    <div
      class="flex justify-center items-center text-lg w-[50px] h-[50px] settings rounded-l-full rounded-tr-full"
      :class="mode === 'search' ? 'bg-blue-700' : 'bg-white/80'"
      @click="handleOpenClick"
    >
      <div :class="[mode === 'normal'? 'spin' : '', mode === 'search' ? 'text-white' : '']">
        <van-icon v-if="mode === 'normal'" name="setting-o" />
        <van-icon v-if="mode === 'search'" name="search" />
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
