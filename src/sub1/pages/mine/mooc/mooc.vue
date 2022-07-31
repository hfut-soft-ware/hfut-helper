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
      isMooc: item.mock,
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
          value: detail.weeks.length > 0 ? detail.weeks : '暂无',
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
  <div class="w-screen min-h-screen bg-gray-300/25">
    <div class="w-[90vw] min-h-screen mx-auto py-10">
      <div class="flex flex-col gap-3">
        <template v-if="moocDetailList.length">
          <template
            v-for="mooc in moocDetailList"
            :key="mooc.id"
          >
            <div
              class="card-shadow bg-white flex flex-col gap-2 p-5 rounded-lg"
            >
              <p class="font-bold">
                {{ mooc.name }}
              </p>
              <CourseDetail :detail="mooc.detail" />
            </div>
          </template>
        </template>
        <template v-else>
          <van-empty description="同学你这学期没有选慕课哦~" />
        </template>
      </div>
    </div>
  </div>
</template>
