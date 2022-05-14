<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { GetCourseByHourIndexReturn } from '@/store/courseList.store'
import { getTeachers, useCourseListStore } from '@/store/courseList.store'
import { dayHours } from '@/shared/constant'
import CoursePopup from '@/components/CoursePopup/course-popup.vue'

const store = useCourseListStore()
const { todayCourse } = storeToRefs(store)

const cardsColor = reactive([
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
])

const show = ref(false)

const courseData = ref<GetCourseByHourIndexReturn>()

function handleCourseClick(course: GetCourseByHourIndexReturn) {
  courseData.value = course

  show.value = true
}

function onClose() {
  show.value = false
}

</script>

<template>
  <course-popup v-if="show" :show="show" :data="courseData" @close="onClose" />
  <div class="course-list-cards">
    <template v-if="todayCourse?.length">
      <div class="card-list-container">
        <div
          v-for="hour in dayHours"
          :key="hour.start"
          class="card-container"
        >
          <div class="time">
            {{ hour.start }}
          </div>
          <template v-if="hour.start !== '22:00'">
            <template v-if="hour.start === '12:00'">
              <div class="lunch-card" style="flex: 6">
                午休
              </div>
            </template>
            <template v-else>
              <template v-for="(item, idx) in [store.getCourseByHourIndex(hour.index)]" :key="item?.course?.startTime || idx">
                <template v-if="item.course">
                  <div
                    :key="item.course.startTime"
                    :class="`card ${cardsColor[item.course.index]} ${item.course.wholePoint ? 'mt-2': 'mt-4'}`"
                    @click="handleCourseClick(item)"
                  >
                    <div class="card-flex">
                      <div class="flex justify-between py-2 items-center">
                        <div class="text-xs">
                          {{ item.course.startTime }} - {{ item.course.endTime }}
                        </div>
                        <div class="text-sm">
                          {{ getTeachers(item.detail.detailInfo.teachers) }}
                        </div>
                      </div>
                      <div class="font-bold text-base">
                        {{ item.detail.courseName }}
                      </div>
                      <div class="text-xs">
                        {{ item.course.room }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="h-20" />
                </template>
              </template>
            </template>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <van-empty description="今天没课噢，放松一下吧♪（＾∀＾●）ﾉｼ" />
    </template>
  </div>
</template>

<style lang='scss' scoped>
// 针对小程序对于JS的JIT支持不好的问题
@mixin generateCardStyle($color) {
  background-color: rgba($color, .15);
  color: $color;
  border: 1px solid rgba($color, .2);
  border-left: 2px solid $color;
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
.purple {
  @include generateCardStyle(#9A88C6);
}

.course-list-cards {
  @apply w-full h-full bg-white mt-10 rounded-t-3xl pt-5 pb-5;
  .card-list-container {
    @apply flex flex-col gap-4 mt-5 w-[90%] m-auto;
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
        @apply rounded-lg mt-2 h-16 bg-slate-200/50 text-lg flex justify-center items-center text-slate-400;
      }
      .card {
        transition: all .2s;
        @apply flex-[6] flex gap-3 p-2 rounded-lg h-24;
        &-flex {
          @apply flex flex-col gap-2 w-full;
        }

      }
    }

  }

}

</style>
