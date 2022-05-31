<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useCourseListStore } from '@/store/courseList.store'

const store = useCourseListStore()

const { weekSchedule } = storeToRefs(store)

</script>

<template>
  <div class="h-[120px] w-screen z-[1] bg-white/40 fixed">
    <div class="absolute bottom-3 w-screen flex w-[95vw] mx-[2.5vw] justify-between">
      <van-icon name="like-o" />

      <p>当前是第{{ weekSchedule.weekIdx }}周</p>
      <van-icon name="setting-o" />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
