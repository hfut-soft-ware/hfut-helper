<script lang='ts' setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDayHours } from './use-dayHours'
import type { CourseData } from '@/store/courseList.store'
import { formatCourseName, formatRoom, getTeachers, useCourseListStore } from '@/store/courseList.store'
import CoursePopup from '@/components/CoursePopup/course-popup.vue'
import BounceBall from '@/components/BounceBall/BounceBall.vue'
import { handleSpecialExamSchedule } from '@/pages/day-schedule/special-case'

const store = useCourseListStore()
const { todayCourse } = storeToRefs(store)

const { dayHours } = useDayHours()

const show = ref(false)
const isCustom = ref(false)

const courseData = ref<CourseData>()
const conflictCourse = ref<CourseData[]>([])
const conflictCourseShow = ref(false)

const courseList = computed(() => handleSpecialExamSchedule(dayHours.map((hour) => {
  return {
    time: hour,
    course: store.getCourseByHourIndex(hour.index),
  }
})),
)

function handleCourseClick(course: CourseData) {
  courseData.value = course
  // 处理自定义课程
  if (course?.detail?.type === 'Diy') {
    isCustom.value = true
  } else {
    isCustom.value = false
  }
  show.value = true
}

function onClose() {
  show.value = false
}

function handleConflict(courses: CourseData[]) {
  conflictCourseShow.value = true
  conflictCourse.value = courses
}

function closeConflictCourseShow() {
  conflictCourseShow.value = false
}
</script>

<template>
  <course-popup v-if="show" :show="show" :is-custom="isCustom" :data="courseData!" @close="onClose" />
  <van-popup
    :show="conflictCourseShow"
    round
    closeable
    position="bottom"
    custom-style="height: 40%"
    @close="closeConflictCourseShow"
  >
    <div class="p-3 mt-3 flex flex-col gap-5">
      <h2 class="font-semibold text-center">
        课程详情
      </h2>
      <div class="flex flex-col gap-3">
        <div
          v-for="item in conflictCourse"
          :key="item.detail?.courseName"
          class="flex justify-between items-center"
        >
          <div class="flex flex-col gap-1">
            <p>{{ item.detail?.courseName }}</p>
            <div class="flex flex-col text-xs text-[#666666] gap-1">
              <div class="flex gap-1">
                <van-icon name="clock-o" />
                <p>{{ item.course?.startTime }}-{{ item.course?.endTime }}</p>
              </div>
              <div class="flex gap-1">
                <van-icon name="location-o" />
                <p>{{ item.course?.room }}</p>
              </div>
            </div>
          </div>
          <div
            class="px-4 py-2 bg-[#E5F1FE] rounded-full text-[#0C84FF] text-sm" @click="() => {
              handleCourseClick(item)
              closeConflictCourseShow()
            }"
          >
            详情
          </div>
        </div>
      </div>
    </div>
  </van-popup>
  <div class="course-list-cards">
    <template v-if="todayCourse?.length">
      <div class="card-list-container">
        <div
          v-for="list in courseList"
          :key="list.time.start"
          class="card-container"
        >
          <div class="time">
            {{ list.time.start }}
          </div>
          <template v-if="list.time.start !== '22:00'">
            <template v-if="list.time.start === '12:00' || list.time.start==='12:10'">
              <div class="lunch-card" style="flex: 6">
                午休
              </div>
            </template>
            <template v-else>
              <!-- 课程冲突的情况 -->
              <template v-if="list.course.length > 1">
                <div class="card red flex-col justify-center mt-4 relative" @click="handleConflict(list.course)">
                  <bounce-ball class="top-2 right-0 absolute" />
                  <p class="font-semibold text-base">
                    这里有{{ list.course.length }}门课冲突
                  </p>
                  <p>
                    点击查看详情
                  </p>
                </div>
              </template>
              <template v-else>
                <template v-if="list.course.length === 1">
                  <div
                    :key="list.course[0].course?.startTime"
                    :class="`card ${(list.course[0] as any).detail.color} ${list.course[0].course?.startTime === list.time.start ? 'mt-2': 'mt-4'}`"
                    @click="handleCourseClick(list.course[0])"
                  >
                    <div class="card-flex">
                      <div class="flex justify-between items-center text-xs">
                        <div>
                          {{ list.course[0].course?.startTime }} - {{ list.course[0].course?.endTime }}
                        </div>
                        <div>
                          {{ list.course[0].detail?.detailInfo.teachers && getTeachers(list.course[0].detail.detailInfo.teachers) }}
                        </div>
                      </div>
                      <div class="font-semibold text-base">
                        {{ list.course[0].detail?.courseName && formatCourseName(list.course[0].detail?.courseName) }}
                      </div>
                      <div>
                        {{ formatRoom(list.course[0].course!.room) }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="h-[6rem]" />
                </template>
              </template>
            </template>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="h-[450px]">
        <van-empty description="今天没课噢，放松一下吧♪（＾∀＾●）ﾉｼ" />
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
// 针对小程序对于JS的JIT支持不好的问题
@mixin generateCardStyle($color) {
  background-color: rgba($color, 0.15);
  color: $color;
  border: 1px solid rgba($color, 0.2);
  border-left: 2px solid $color;
}

.light-yellow {
  @include generateCardStyle(#FD9800);
}
.light-blue {
  @include generateCardStyle(#00A5F1);
}
.pink {
  @include generateCardStyle(#F167BA);
}
.grown {
  @include generateCardStyle(#CBA713);
}
.light-green {
  @include generateCardStyle(#3CB3C9);
}
.blue {
  @include generateCardStyle(#00A6F2);
}
.purple {
  @include generateCardStyle(#B967E3);
}
.yellow {
  @include generateCardStyle(#F8A043);
}
.red {
  @include generateCardStyle(#F88C8E);
}
.green {
  @include generateCardStyle(#3EB770);
}
.blue {
  @include generateCardStyle(#63B1EF);
}

.course-list-cards {
  @apply w-full h-full bg-white mt-10 rounded-t-3xl pt-1 pb-5;
  .card-list-container {
    @apply flex flex-col gap-1 mt-5 w-[90%] m-auto;
    .card-container {
      @apply flex gap-5 text-slate-400 text-xs;
      .time {
        @apply relative flex-1;
        &:after {
          content: '';
          @apply absolute h-[1px] w-screen bg-slate-300/80 left-14 mt-2;
        }
      }
      .lunch-card {
        @apply rounded-lg mt-2 h-12 bg-slate-200/50 text-lg flex justify-center items-center text-slate-400;
      }
      .card {
        transition: all .2s;
        @apply flex-[5] flex gap-1 p-2 rounded-lg h-20;
        &-flex {
          @apply flex flex-col gap-2 w-full justify-center;
        }

      }
    }

  }

}

</style>
