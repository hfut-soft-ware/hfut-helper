<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { onShow } from '@dcloudio/uni-app'
// import Toast from '@vant/weapp/lib/toast/toast'
import Setting from './setting.vue'
import { useCourseSearchStore } from '@/store/courseSearch.store'
import CourseList from '@/pages/week-schedule/course-list.vue'
import { useWeekListSettingsStore } from '@/store/weekListSettings.store'

const store = useCourseSearchStore()
const { mode } = storeToRefs(store)

const settingsStore = useWeekListSettingsStore()
const { bgImg, imgMode } = storeToRefs(settingsStore)

onShow(() => {
  mode.value = 'search'
})

</script>

<template>
  <van-toast id="van-toast" />
  <img class="w-screen min-h-screen h-full top-0 fixed" :mode="imgMode" :src="bgImg">
  <CourseList course-search />
  <Setting />
</template>

<style lang='scss' scoped>

</style>
