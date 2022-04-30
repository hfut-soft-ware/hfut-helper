<script lang='ts' setup>
import { reactive, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useCourseListStore } from '@/store/courseList.store'
import { existProperty, getTeacherName } from '@/shared/utils'
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

const courseData = ref([])

function handleCourseClick(course: any) {
  courseData.value = course.course

  show.value = true
}

function onClose() {
  show.value = false
}

watchEffect(() => {
  console.log('todayCourse', todayCourse.value)
})

</script>

<template>
  <course-popup v-if="show" :show="show" :data="courseData" @close="onClose" />
  <view class="course-list-cards">
    <template v-if="todayCourse?.length">
      <view class="card-list-container">
        <view
          v-for="hour in dayHours"
          :key="hour.start"
          class="card-container"
        >
          <view class="time">
            {{ hour.start }}
          </view>
          <template v-if="hour.start !== '22:00'">
            <template v-if="hour.start === '12:00'">
              <view class="lunch-card" style="flex: 6">
                午休
              </view>
            </template>
            <template v-else>
              <template v-if="hour.index && existProperty(todayCourse[hour.index - 1].course)">
                <view
                  :class="`card ${cardsColor[hour.index - 1]} ${hour.index % 2 === 0 ? 'mt-3' : 'mt-2'}`"
                  @click="handleCourseClick(todayCourse[hour.index - 1])"
                >
                  <view class="card-flex">
                    <view class="header">
                      <view class="text-xs">
                        {{ todayCourse[hour.index - 1].startTimeText }} - {{ todayCourse[hour.index - 1].endTimeText }}
                      </view>
                      <view class="text-sm">
                        {{ existProperty(todayCourse[hour.index - 1].course) ? getTeacherName(todayCourse[hour.index - 1].course.teachers): '' }}
                      </view>
                    </view>
                    <view class="font-bold text-base">
                      {{ todayCourse[hour.index - 1].course.lessonDetail.course.nameZh }}
                    </view>
                    <view class="text-xs">
                      {{ todayCourse[hour.index - 1].course.room.nameZh }}
                    </view>
                  </view>
                </view>
              </template>
              <template v-else>
                <view class="h-20" />
              </template>
            </template>
          </template>
        </view>
      </view>
    </template>
    <template v-else>
      <van-empty description="今天没课噢，放松一下吧♪（＾∀＾●）ﾉｼ" />
    </template>
  </view>
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
          .header {
            @apply flex justify-between py-2;
          }
        }

      }
    }

  }

}

</style>
