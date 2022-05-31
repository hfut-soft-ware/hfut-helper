<script lang='ts' setup>
import logo from './img.png'
import Header from './header.vue'
import CourseList from '@/pages/week-schedule/course-list.vue'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'

const { isLoading, error, state } = useCourseRequest()

</script>

<template>
  <Header />
  <template v-if="state && !isLoading">
    <div class="min-h-screen relative">
      <img class="w-screen min-h-screen h-full top-0 fixed" :src="logo">
      <div class="absolute z-1">
        <CourseList />
      </div>
    </div>
  </template>
</template>
