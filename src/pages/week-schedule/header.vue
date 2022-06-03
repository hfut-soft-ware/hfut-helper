<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { useCourseListStore } from '@/store/courseList.store'

const store = useCourseListStore()

const { weekSchedule, weekScheduleVisibleWeek } = storeToRefs(store)

</script>

<template>
  <div class="h-[100px] w-screen z-[1] bg-white/30 fixed">
    <div class="absolute bottom-1 w-screen flex flex-col w-[95vw]">
      <div class="flex justify-center mx-[2.5vw]">
        <p>当前是第{{ weekSchedule.weekIdx + 1 }}周</p>
      </div>
      <div class="flex w-screen mt-2">
        <template v-if="weekScheduleVisibleWeek.course">
          <div
            v-for="weekday in weekScheduleVisibleWeek.week"
            :key="weekday.date"
            class="flex-1 text-xs text-center"
            :class="`${weekday.active ? 'active-day' : ''}`"
          >
            <p>{{ format(weekday.date, 'EEE.') }}</p>
            <p class="text-[10px]">
              {{ format(weekday.date, 'MM/dd') }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.active-day {
  @apply text-[#217DD2] font-bold;
}
</style>
