<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { onShow } from '@dcloudio/uni-app'
import CourseList from '@/pages/week-schedule/course-list.vue'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'
import { usePullDownUpdateCourse } from '@/shared/hooks/use-PullDownUpdateCourse'
import Settings from '@/pages/week-schedule/settings.vue'
import CourseSettings from '@/pages/week-schedule/course-settings.vue'
import { useWeekListSettingsStore } from '@/store/weekListSettings.store'
import { useCourseSearchStore } from '@/store/courseSearch.store'
import { useCourseListStore } from '@/store/courseList.store'

const { isLoading, state } = useCourseRequest()
const settingsStore = useWeekListSettingsStore()
const { bgImg, imgMode } = storeToRefs(settingsStore)
const { mode } = storeToRefs(useCourseSearchStore())
const store = useCourseListStore()

usePullDownUpdateCourse()

onShow(() => {
  if (mode.value !== 'normal') {
    mode.value = 'normal'
    store.initCachedStore()
  }
})
</script>

<template>
  <CourseSettings />
  <van-toast id="van-toast" />
  <van-dialog id="van-dialog" />
  <template v-if="state && !isLoading">
    <div class="relative h-[130vh]">
      <img class="w-screen min-h-screen h-full top-0 fixed" :mode="imgMode" :src="bgImg">
      <div class="absolute z-1">
        <CourseList />
      </div>
      <Settings />
    </div>
  </template>
</template>
