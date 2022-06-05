<script lang='ts' setup>
import { computed } from 'vue'
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

const isExam = computed(() => data.detail?.type === 'Exam')

const headerInfo = computed(() => {
  const res = [
    {
      title: '考试名称',
      value: data.detail!.courseName,
    },
    {
      title: '考试时间',
      value: `${data.course!.startTime} - ${data.course!.endTime}`,
    },
  ]

  if (!isExam.value) {
    const item = res[0]
    item.title = '老师名字'
    item.value = getTeachers(data.detail!.detailInfo.teachers)
    res[1].title = '上课时间'
  }

  return res
})

const lessonDetailList = computed<TCourseDetail[]>(() => {
  const detail = data.detail!

  if (isExam.value) {
    return [
      {
        icon: 'location-o',
        title: '考试地点',
        value: data.course?.room,
      },
    ]
  }

  return [
    {
      icon: 'location-o',
      title: '上课地点',
      value: data.course?.room,
    },
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
    :custom-style="isExam ? 'height: 50%' : 'height: 85%'"
    :overlay-style="isExam ? '' : 'background-color: #4981F9'"
    @close="onClose"
  >
    <div class="container">
      <div class="header">
        <div class="courseName">
          <div :class="`line ${isExam ? 'line-exam' : ''}`" />
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
      .line-exam {
        background-color: $red !important;
      }
    }
    .info {
      @apply flex justify-between;
    }
  }

}
</style>
