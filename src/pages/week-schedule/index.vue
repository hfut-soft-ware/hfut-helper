<script lang='ts' setup>
import Header from './header.vue'
import CourseList from '@/pages/week-schedule/course-list.vue'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'
import { usePullDownUpdateCourse } from '@/shared/hooks/use-PullDownUpdateCourse'
import Settings from '@/pages/week-schedule/settings.vue'

const { isLoading, state } = useCourseRequest()
usePullDownUpdateCourse()
</script>

<template>
  <Header />
  <van-toast id="van-toast" />
  <template v-if="state && !isLoading">
    <div class="min-h-screen relative">
      <img class="w-screen min-h-screen h-full top-0 fixed" :src="''">
      <div class="absolute z-1">
        <CourseList />
      </div>

      <Settings />
    </div>
  </template>
</template>
