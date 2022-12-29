<script setup lang='ts'>
import { computed } from 'vue'
import type { CourseItem } from '@/sub1/pages/mine/course-search/type'
interface Props {
  courseInfo: CourseItem
}
interface TCourseDetail {
  icon: string
  title: string
  value: string | string[]
}

const props = defineProps<Props>()

const courseInfoArray = computed<TCourseDetail[]>(() => [
  {
    title: '校区',
    icon: 'location-o',
    value: props.courseInfo.campus,
  },
  {
    title: '教学班代码',
    icon: 'coupon-o',
    value: props.courseInfo.classCode,
  },
  {
    title: '教学班名称',
    icon: 'comment-o',
    value: props.courseInfo.className,
  },
  {
    title: '课程类型',
    icon: 'bag-o',
    value: props.courseInfo.courseType,
  },
  {
    title: '学分',
    icon: 'send-gift-o',
    value: `${props.courseInfo.credits}`,
  },
  {
    title: '考核方式',
    icon: 'medal-o',
    value: props.courseInfo.examMod,
  },
  {
    title: '开课部门',
    icon: 'comment-o',
    value: props.courseInfo.openDepart,
  },
  {
    title: '日期时间地点人员',
    icon: 'flag-o',
    value: props.courseInfo.schedule,
  },
  {
    title: '授课教师',
    icon: 'manager-o',
    value: props.courseInfo.teachers,
  },
  {
    title: '课程代码',
    icon: 'coupon-o',
    value: props.courseInfo.courseCode,
  },
])
</script>

<template>
  <p class="font-bold text-lg mb-2">
    {{ courseInfo.courseName }}
  </p>
  <div v-for="item in courseInfoArray" :key="item.title" class="mt-2 flex gap-2">
    <div class="relative">
      <van-icon :name="item.icon" class="text-[#808599] mt-1" />
    </div>
    <div>
      <div class="text-md font-bold text-[#464953]">
        {{ item.title }}
      </div>
      <template v-if="(typeof item.value === 'string')">
        <div class="text-xs text-[#808599] mt-2">
          {{ item.value }}
        </div>
      </template>
      <template v-else>
        <div v-for="str in item.value" :key="str">
          <div class="text-xs text-[#808599] mt-2">
            {{ str }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
