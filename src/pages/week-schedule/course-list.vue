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
import { useRef } from '@/shared/hooks/useRef'
import type { ISchedule } from '@/shared/types/response/course'
import type { TEmptyCoursePos } from '@/pages/week-schedule/use-customCourse'
import { useCustomCourse } from '@/pages/week-schedule/use-customCourse'
import CustomCourse from '@/pages/week-schedule/custom-course.vue'

const store = useCourseListStore()
const { weekScheduleVisibleWeek, weekSchedule } = storeToRefs(store)

const { onTouchStart, onTouchEnd, onPrev, onNext } = useTouchInteractive(store, 'week')

const courseList = computed<CourseData[][]>(() => {
  const weekVal = weekScheduleVisibleWeek.value

  return Array.from({ length: 7 }, (_, weekday) => {
    const todayCourse = weekVal.course[weekday]
    return Array.from({ length: 11 }, (_, lessonIdx) => {
      const courseResource = todayCourse.filter(course => course.lessonStartIndex === lessonIdx + 1)

      if (courseResource.length === 0) {
        return undefined
      }

      const course = courseResource[0]

      return {
        detail: store.getCourseDetailByIdx(course.lessonIndex),
        course: {
          ...course,
          extraCourse: [...courseResource.slice(0)],
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

const [conflictCourseShow, setConflictCourseShow] = useRef(false)
const conflictCourse = ref<CourseData[]>([])

const {
  customCourseShow,
  currentEmptyCourse,
  startIndex,
  onCustomCourseClose,
  handleOpenCustomCourse,
  handleCustomCourseCardClick,
} = useCustomCourse()

function handleCourseClick(clickedCourse: CourseData, pos: TEmptyCoursePos = currentEmptyCourse) {
  // 处理自定义课程
  if (isUndefined(clickedCourse)) {
    handleCustomCourseCardClick(pos)
    return
  }

  // 处理冲突课程
  if ((clickedCourse.course as any).extraCourse && (clickedCourse.course as any).extraCourse.length > 1) {
    setConflictCourseShow(true)
    conflictCourse.value = (clickedCourse.course as any).extraCourse.map((course: ISchedule) => {
      return {
        course,
        detail: store.getCourseDetailByIdx(course.lessonIndex),
      }
    })
    return
  }
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
  <van-popup
    :show="customCourseShow"
    round
    closeable
    position="bottom"
    custom-style="height: 90%"
    @close="onCustomCourseClose"
  >
    <CustomCourse :start-index="startIndex" :current-week="weekSchedule.weekIdx" />
  </van-popup>
  <course-popup v-if="show" :show="show" :data="courseData" @close="onClose" />
  <van-popup
    :show="conflictCourseShow"
    round
    closeable
    position="bottom"
    custom-style="height: 40%"
    @close="setConflictCourseShow(false)"
  >
    <div class="p-3 mt-3 flex flex-col gap-5">
      <h2 class="font-semibold text-center">
        课程详情
      </h2>
      <div class="flex flex-col gap-3">
        <div
          v-for="item in conflictCourse"
          :key="item.detail.courseName"
          class="flex justify-between items-center"
        >
          <div class="flex flex-col gap-1">
            <p>{{ item.detail.courseName }}</p>
            <div class="flex flex-col text-xs text-[#666666] gap-1">
              <div class="flex gap-1">
                <van-icon name="clock-o" />
                <p>{{ item.course.startTime }}-{{ item.course.endTime }}</p>
              </div>
              <div class="flex gap-1">
                <van-icon name="location-o" />
                <p>{{ item.course.room }}</p>
              </div>
            </div>
          </div>
          <div
            class="px-4 py-2 bg-[#E5F1FE] rounded-full text-[#0C84FF] text-sm" @click="() => {
              handleCourseClick(item)
              setConflictCourseShow(false)
            }"
          >
            详情
          </div>
        </div>
      </div>
    </div>
  </van-popup>
  <div
    class="w-screen mt-[125px] overflow-hidden flex relative"
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
        @click="handleCourseClick(course, {x: weekday, y: index})"
      >
        <template v-if="course?.detail">
          <div
            class="relative rounded-md px-1 text-xs flex flex-col gap-2 pt-1"
            :class="`${course.detail?.color} ${course.detail?.type === 'Exam' ? 'exam-card' : ''}`"
            :style="{height: `${course.course.height}px`, opacity: settings.alpha / 100}"
          >
            <div v-if="course.detail?.type === 'Exam'" class="animate-bounce absolute right-2 flex justify-items-end items-center">
              <span class="animate-ping h-2 w-2 absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </div>
            <div v-if="course.course.extraCourse.length > 1" class="animate-bounce absolute right-2 flex justify-items-end items-center">
              <span class="animate-ping h-2 w-2 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </div>
            <template v-if="course.detail?.type === 'Exam' && course.course.height === 60">
              <p class="font-bold">
                {{ formatCourseName(course.detail?.courseName) }}
              </p>
            </template>
            <template v-if="course.course.extraCourse.length === 1">
              <p class="font-bold">
                {{ formatCourseName(course.detail?.courseName) }}
              </p>
              <p class="text-[11px]">
                {{ formatRoom(course.course?.room) }}
              </p>
            </template>
            <template v-else>
              <p class="font-bold">
                这里有{{ course.course.extraCourse.length }}门课冲突
              </p>
              <p class="text-[11px]">
                点击查看详情
              </p>
            </template>
          </div>
        </template>
        <template v-if="currentEmptyCourse.x === weekday && currentEmptyCourse.y === index">
          <div class="addCard" @click="handleOpenCustomCourse">
            <van-icon name="plus" />
          </div>
        </template>
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
.addCard {
  @apply bg-white/50 flex justify-center items-center rounded-lg h-[60px] text-black/80;
}

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
  @include generateCardStyle(#FCEBCD, #FE9900);
}
.light-yellow {
  @include generateCardStyle(#FCEBCF, #FD9800);
}
.light-blue {
  @include generateCardStyle(#E6F4FF,#00A5F1);
}
.blue {
  @include generateCardStyle(#E6F3FE, #00A5F1);
}
.pink {
  @include generateCardStyle(#FFEEF8, #F167BA);
}
.red {
  @include generateCardStyle(#FFEFF0, #EF5B75);
}
.grown {
  @include generateCardStyle(#FFF9C9, #CBA713);
}
.light-green {
  @include generateCardStyle(#DEFBF7, #3CB3C9);
}
.green {
  @include generateCardStyle(#E2F9F3, #27BCA9);
}
.blue {
  @include generateCardStyle(#E6F4FF, #00A6F2);
}
.purple {
  @include generateCardStyle(#FAEDFF, #B967E3);
}

</style>
