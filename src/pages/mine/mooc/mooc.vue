<script lang='ts' setup>
import { computed } from 'vue'
import type { TCourseDetail } from '@/components/CourseDetail/course-detail.vue'
import CourseDetail from '@/components/CourseDetail/course-detail.vue'
import { getStorageCourse } from '@/store/courseList.store'

const list = getStorageCourse()

const moocDetailList = computed(() => {
  const mooc = list.mooc

  return mooc.map((item) => {
    const detail = item.detail
    return {
      name: item.name,
      detail: [
        {
          icon: 'bookmark-o',
          title: '学分',
          value: detail.credits,
        },
        {
          icon: 'records',
          title: '考试形式',
          value: detail.examMode,
        },
        {
          icon: 'bookmark-o',
          title: '上课班级',
          value: detail.adminClass,
        },
        {
          icon: 'notes-o',
          title: '上课周数',
          value: detail.weeks.length > 0 ? detail.weeks : '建议前往学习通查看',
        },

        {
          icon: 'friends-o',
          title: '上课人数',
          value: detail.studentCount,
        },
        {
          icon: 'apps-o',
          title: '课程类型',
          value: detail.courseType,
        },
        {
          icon: 'coupon-o',
          title: '课程代码',
          value: detail.code,
        },
      ] as TCourseDetail[],
    }
  })
})
</script>

<template>
  <div class="w-[90vw] min-h-screen mx-auto py-10">
    <div class="flex flex-col gap-3 bg-white">
      <div
        v-for="mooc in moocDetailList"
        :key="mooc.id"
        class="card-shadow flex flex-col gap-2 p-5 rounded-lg"
      >
        <p class="font-bold">
          {{ mooc.name }}
        </p>
        <CourseDetail :detail="mooc.detail" />
      </div>
    </div>
  </div>
</template>
