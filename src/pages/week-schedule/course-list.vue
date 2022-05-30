<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { computed, reactive, ref, watchEffect } from 'vue'
import type { CourseData } from '@/store/courseList.store'
import { getTeachers, useCourseListStore } from '@/store/courseList.store'
import CoursePopup from '@/components/CoursePopup/course-popup.vue'
import { isOdd } from '@/shared/utils'

const store = useCourseListStore()
const { weekScheduleVisibleWeek } = storeToRefs(store)

// TODO: 用computed处理好结构
const courseList = computed<{
  time: Date[]
  schedule: CourseData[]
}[]>(() => {
  const weekVal = weekScheduleVisibleWeek.value

  return weekVal.week.map((item, idx) => ({
    time: item.date,
    schedule: weekVal.course[idx].map((course) => {
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
  <div class="w-[98vw] mx-auto">
    <div class="grid grid-cols-7 h-screen">
      <div
        v-for="item in courseList"
        :key="item.time"
      >
        <div class="text-center flex flex-col text-xs">
          <p>{{ format(item.time, 'EEE.') }}</p>
          <p class="text-[10px]">
            {{ format(item.time, 'MM/dd') }}
          </p>
        </div>
        <div class="course-list">
          <div
            v-for="index in 10"
            :key="index"
            class="border-slate-200 h-[60px] px-[2px] py-[3px] border-r-[1px]"
            :class="isOdd(index) ? '' : 'evenBorder'"
            @click="handleCourseClick(findCourse(item.schedule, isOdd(index) ? index : index - 1))"
          >
            <div
              v-if="findCourse(item.schedule, index)"
              class="h-[120px] mt-[1px] rounded-md px-1 text-xs flex flex-col gap-2 pt-1 text-center"
              :class="cardsColor[(Math.ceil(index / 2)) - 1]"
            >
              <template
                v-for="currentCourse in [findCourse(item.schedule, index)]"
                :key="currentCourse.detail.courseName"
              >
                <p class="font-bold">
                  {{ currentCourse.detail.courseName }}
                </p>
                <p class="text-[11px]">
                  {{ currentCourse.course.room }}
                </p>
              </template>
            </div>
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

@mixin generateCardStyle($color) {
  background-color: rgba($color, 0.15);
  color: $color;
}

.yellow {
  @include generateCardStyle(#f8a043);
}
.red {
  @include generateCardStyle(#f88c8e);
}

.green {
  @include generateCardStyle(#3eb770);
}
.blue {
  @include generateCardStyle(#63b1ef);
}
.purple {
  @include generateCardStyle(#9a88c6);
}

</style>
