<script lang='ts' setup>
import CourseList from '@/pages/week-schedule/course-list.vue'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'
import StatusBar from '@/components/status-bar/status-bar.vue'

const { isLoading, error, state } = useCourseRequest()
</script>

<template>
  <StatusBar />
  <template v-if="state && !isLoading">
    <CourseList />
  </template>
</template>
