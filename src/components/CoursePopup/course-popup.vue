<script lang='ts' setup>
import { reactive } from 'vue'
import { getTeacherName } from '@/shared/utils'
import type { Lessons } from '@/shared/types/course'

interface Props {
  show: boolean
  data: { lessonDetail: Lessons; startTime: string; endTime: string }
}

interface Emits {
  (e: 'close'): void
}

const { data, show } = defineProps<Props>()
const emit = defineEmits<Emits>()

const headerInfo = reactive([
  {
    title: '老师',
    value: getTeacherName(data.lessonDetail.teacherAssignmentList as any[]),
  },
  {
    title: '上课时间',
    value: `${data.startTime} - ${data.endTime}`,
  },
])

const { lessonDetail } = data

const lessonDetailList = reactive([
  {
    icon: 'bookmark-o',
    title: '学分',
    value: lessonDetail.course.credits,
  },
  {
    icon: 'bookmark-o',
    title: '上课班级',
    value: lessonDetail.nameZh,
  },
  {
    icon: 'notes-o',
    title: '上课周数',
    value: lessonDetail.suggestScheduleWeeksInfo,
  },

  {
    icon: 'friends-o',
    title: '上课人数',
    value: lessonDetail.stdCount,
  },
  {
    icon: 'apps-o',
    title: '课程类型',
    value: lessonDetail.courseType.nameZh,
  },
  {
    icon: 'coupon-o',
    title: '课程代码',
    value: lessonDetail.code,
  },
])

function onClose() {
  emit('close')
}

</script>

<template>
  <van-popup
    :show="show"
    round
    closeable
    position="bottom"
    custom-style="height: 80%"
    overlay-style="background-color: #4981F9"
    @close="onClose"
  >
    <div class="container">
      <div class="header">
        <div class="courseName">
          <div class="line" />
          <p class="text-lg font-medium">
            {{ data.lessonDetail.course.nameZh }}
          </p>
        </div>
        <div class="info w-[85%] mx-auto mt-3">
          <div v-for="item in headerInfo" :key="item.value" class="flex flex-col gap-3 items-center">
            <p class="text-xs text-slate-400">
              {{ item.title }}
            </p>
            <p class="text-sm">
              {{ item.value }}
            </p>
          </div>
        </div>
        <div class="mt-5">
          <van-divider />
        </div>
        <div
          v-for="item in lessonDetailList"
          :key="item.title"
          class="main mt-5 flex gap-2"
        >
          <div class="relative">
            <van-icon :name="item.icon" class="text-[#808599] mt-1" />
          </div>
          <div>
            <div class="text-md font-bold text-[#464953]">
              {{ item.title }}
            </div>
            <div class="text-xs text-[#808599] mt-2">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style lang='scss' scoped>
.container {
  @apply w-[85%] mx-auto mt-5 relative;
  .header {
    @apply flex flex-col;
    .courseName {
      @apply flex gap-4 items-center;
      .line {
        @apply w-1 h-8 rounded-lg bg-[#{$green}];
      }
    }
    .info {
      @apply flex justify-between;
    }
  }

}
</style>
