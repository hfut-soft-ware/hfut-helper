<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { computed } from 'vue'
import { useCourseListStore } from '@/store/courseList.store'
import type { ILesson, ISchedule } from '@/shared/types/response/course'

const store = useCourseListStore()
const { weekScheduleVisibleWeek } = storeToRefs(store)

const courseList = computed<{
  time: Date[]
  course: {
    schedule: ISchedule
    detail?: ILesson
  }[]
}[]>(() => {
  const weekVal = weekScheduleVisibleWeek.value
  return weekVal.week.map((item, idx) => ({
    time: item.date,
    course: weekVal.course[idx].map((course) => {
      return {
        schedule: course,
        detail: store.getCourseDetailByIdx(course.lessonIndex),
      }
    }),
  }))
})

</script>

<template>
  <div class="w-[98vw] mx-auto">
    <div class="grid grid-cols-7 h-screen">
      <div
        v-for="item in courseList"
        :key="item.time"
      >
        <div class="text-center">
          {{ format(item.time, 'dd') }}
        </div>
        <div class="grid grid-rows-5 h-screen">
          <div
            v-for="course in item.course"
            :key="course.detail.id"
            class="p-1 row-span-1 border border-slate-200"
          >
            <div class="card">
              <div class="text-xs">
                {{ course.detail.courseName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.card {
  @apply rounded-lg border border-orange-200 h-full flex justify-center;
}
</style>
