<script lang='ts' setup>
import { computed, reactive } from 'vue'
import type { CourseData } from '@/store/courseList.store'
import { getTeachers } from '@/store/courseList.store'
import type { TCourseDetail } from '@/components/CourseDetail/course-detail.vue'
import CourseDetail from '@/components/CourseDetail/course-detail.vue'

interface Props {
  show: boolean
  data: CourseData
}

interface Emits {
  (e: 'close'): void
}

const { data, show } = defineProps<Props>()
const emit = defineEmits<Emits>()

const headerInfo = reactive([
  {
    title: '老师',
    value: getTeachers(data.detail!.detailInfo.teachers),
  },
  {
    title: '上课时间',
    value: `${data.course!.startTime} - ${data.course!.endTime}`,
  },
])

const lessonDetailList = computed<TCourseDetail[]>(() => {
  const detail = data.detail!
  return [
    {
      icon: 'bookmark-o',
      title: '学分',
      value: detail.detailInfo.credits,
    },
    {
      icon: 'fire-o',
      title: '上课班级',
      value: detail.detailInfo.adminClass,
    },
    {
      icon: 'notes-o',
      title: '上课周数',
      value: detail.detailInfo.weeks,
    },

    {
      icon: 'friends-o',
      title: '上课人数',
      value: detail.detailInfo.studentCount,
    },
    {
      icon: 'apps-o',
      title: '课程类型',
      value: detail.detailInfo.courseTypeName,
    },
    {
      icon: 'coupon-o',
      title: '课程代码',
      value: detail.detailInfo.code,
    },
  ]
})

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
            {{ data.detail?.courseName }}
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
        <CourseDetail :detail="lessonDetailList" />
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
