<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { computed, reactive, ref } from 'vue'
import { isUndefined } from 'lodash'
import type { CourseData } from '@/store/courseList.store'
import { useCourseListStore } from '@/store/courseList.store'
import CoursePopup from '@/components/CoursePopup/course-popup.vue'
import { isOdd } from '@/shared/utils'
import { useTouchInteractive } from '@/shared/hooks/useTouchInteractive'

const store = useCourseListStore()
const { weekScheduleVisibleWeek } = storeToRefs(store)

const { onTouchStart, onTouchEnd, onTouchMove } = useTouchInteractive(store, 'week')

// TODO: 用computed处理好结构
const courseList = computed<{
  time: Date[]
  active: boolean
  schedule: CourseData[]
}[]>(() => {
  const weekVal = weekScheduleVisibleWeek.value

  return weekVal.week.map((item, idx) => ({
    time: item.date,
    active: item.active,
    schedule: isUndefined(weekVal.course)
      ? []
      : weekVal.course[idx].map((course) => {
        return {
          course,
          detail: store.getCourseDetailByIdx(course.lessonIndex),
        }
      }),
  }))
})

const cardsColor = reactive([
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
])

const show = ref(false)
const courseData = ref<CourseData>()

function findCourse(currentCourse: CourseData[], index: number) {
  if (index % 2 !== 0) {
    index = Math.ceil(index / 2)
  } else {
    return
  }

  return currentCourse.find(item => item.course!.index === index)
}

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
    class="w-screen mt-[120px] overflow-hidden"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="grid grid-cols-7 h-screen">
      <div
        v-for="item in courseList"
        :key="item.time"
      >
        <div
          class="text-center flex flex-col text-xs bg-white/40"
          :class="`${item.active ? 'active-day' : ''}`"
        >
          <p>{{ format(item.time, 'EEE.') }}</p>
          <p class="text-[10px]">
            {{ format(item.time, 'MM/dd') }}
          </p>
        </div>
        <div class="course-list">
          <div
            v-for="index in 11"
            :key="index"
            class="border-slate-200 h-[60px] px-[2px] py-[3px] border-r-[1px]"
            :class="`${isOdd(index) ? '' : 'evenBorder'} `"
            @click="handleCourseClick(findCourse(item.schedule, isOdd(index) ? index : index - 1))"
          >
            <template
              v-for="currentCourse in [findCourse(item.schedule, index)]"
              :key="currentCourse?.detail?.courseName"
            >
              <div
                v-if="currentCourse"
                class="mt-[1px] rounded-md px-1 text-xs flex flex-col gap-2 pt-1 text-center"
                :class="cardsColor[(Math.ceil(index / 2)) - 1]"
                :style="{height: `${currentCourse.course.period * 60}px`}"
              >
                <p class="font-bold">
                  {{ currentCourse.detail?.courseName }}
                </p>
                <p class="text-[11px]">
                  {{ currentCourse.course?.room }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
// 偶数行的边框，写在此处是为了解决JIT问题
.evenBorder {
  @apply  border-b-[1px];
}

@mixin generateCardStyle($bgColor, $textColor) {
  background-color: rgba($bgColor, .8);
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
.active-day {
  @apply text-[#217DD2] font-bold;
}
</style>
