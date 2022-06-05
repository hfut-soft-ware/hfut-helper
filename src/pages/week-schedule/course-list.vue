<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { isOdd, isUndefined } from '@/shared/utils'
import type { CourseData } from '@/store/courseList.store'
import { formatCourseName, formatRoom, useCourseListStore } from '@/store/courseList.store'
import CoursePopup from '@/components/CoursePopup/course-popup.vue'
import { useTouchInteractive } from '@/shared/hooks/useTouchInteractive'
import { WEEK_SCHEDULE_CARD_HEIGHT } from '@/pages/week-schedule/constant'
import { useWeekListSettingsStore } from '@/store/weekListSettings.store'

const store = useCourseListStore()
const { weekScheduleVisibleWeek } = storeToRefs(store)

const { onTouchStart, onTouchEnd, onPrev, onNext } = useTouchInteractive(store, 'week')

const courseList = computed<CourseData[][]>(() => {
  const weekVal = weekScheduleVisibleWeek.value

  return Array.from({ length: 7 }, (_, weekday) => {
    const todayCourse = weekVal.course[weekday]
    return Array.from({ length: 11 }, (_, lessonIdx) => {
      const course = todayCourse.find(course => course.lessonStartIndex === lessonIdx + 1)

      if (isUndefined(course)) {
        return undefined
      }

      return {
        detail: store.getCourseDetailByIdx(course.lessonIndex),
        course: {
          ...course,
          height: course.period * WEEK_SCHEDULE_CARD_HEIGHT,
        },
      }
    })
  }) as CourseData[][]
})

const show = ref(false)
const courseData = ref<CourseData>()

const settingsStore = useWeekListSettingsStore()

const { settings } = storeToRefs(settingsStore)

function handleCourseClick(clickedCourse: CourseData) {
  if (clickedCourse) {
    show.value = true
    courseData.value = clickedCourse
  }
}

function onClose() {
  show.value = false
}

</script>

<template>
  <course-popup v-if="show" :show="show" :data="courseData" @close="onClose" />
  <div
    class="w-screen mt-[100px] overflow-hidden flex relative"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div
      v-for="(courses, weekday) in courseList"
      :key="weekday"
      class="flex-1"
    >
      <div
        v-for="(course, index) in courses"
        :key="`${course?.course?.lessonStartIndex}-${course?.detail?.id}${index}`"
        class="h-[62px] border-r-[1px] border-slate-200 px-[2px]"
        :class="isOdd(index + 1) ? 'oddBorder' : 'evenBorder'"
      >
        <template v-if="course?.detail">
          <div
            class="relative rounded-md px-1 text-xs flex flex-col gap-2 pt-1"
            :class="`${course.detail?.color} ${course.detail?.type === 'Exam' ? 'exam-card' : ''}`"
            :style="{height: `${course.course.height}px`, opacity: settings.alpha / 100}"
            @click="handleCourseClick(course)"
          >
            <div v-if="course.detail?.type === 'Exam'" class="animate-bounce absolute right-2 flex justify-items-end items-center">
              <span class="animate-ping h-2 w-2 absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </div>
            <template v-if="course.detail?.type === 'Exam' && course.course.height === 60">
              <p class="font-bold">
                {{ formatCourseName(course.detail?.courseName) }}
              </p>
            </template>
            <template v-else>
              <p class="font-bold">
                {{ formatCourseName(course.detail?.courseName) }}
              </p>
              <p class="text-[11px]">
                {{ formatRoom(course.course?.room) }}
              </p>
            </template>
          </div>
        </template>
        <template v-else />
      </div>
    </div>
    <div class="fixed bottom-3 w-screen z-[1]">
      <div class="flex justify-between w-screen">
        <div class="arrow" @click="onPrev">
          <van-icon name="arrow-left" />
        </div>
        <div class="arrow" @click="onNext">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
// 偶数行的边框，写在此处是为了解决JIT问题
.evenBorder {
  @apply border-b-[1px] pb-[1px];
}

.oddBorder {
  @apply pt-[1px];
}

.arrow {
  @apply w-[75px] h-[75px] rounded-full bg-gray-300/70 text-black/60 flex justify-center items-center;
}

@mixin generateCardStyle($bgColor, $textColor) {
  background: $bgColor;
  color: $textColor;
}

.yellow {
  @include generateCardStyle(#FCEBCF, #FE9900);
}
.red {
  @include generateCardStyle(#FFEFF0, #EF5B75);
}

.green {
  @include generateCardStyle(#E2F9F3, #27BCA9);
}
.blue {
  @include generateCardStyle(#E6F4FF, #00A6F2);
}
.purple {
  @include generateCardStyle(#FAECFF, #B569DD);
}

</style>
