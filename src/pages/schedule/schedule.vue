<script lang='ts' setup>
import { useAsyncState } from '@vueuse/core'
import { computed } from 'vue'
import Header from './Header.vue'
import DayCard from './day-card.vue'
import { getCourseListRequest } from '@/server/api/eam'

const { state, isLoading, isReady } = useAsyncState(getCourseListRequest, {} as any)

const courseList = computed(() => (state.value as any).data)

</script>

<template>
  <view class="status-bar" />
  <view class="w-screen bg-[#F6F8FA] pt-5">
    <view class="container w-[100vw]">
      <Header />
      <DayCard />
    </view>
  </view>
</template>

<style scoped>
.status-bar {
  height: var(--status-bar-height);
  background-color: #F6F8FA;
}
</style>
