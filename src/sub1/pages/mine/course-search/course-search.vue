<script setup lang='ts'>
import { computed, ref } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import CourseSearch from '@/sub1/component/card-container/CardContainer.vue'
import { courseSearch } from '@/server/api/course'
import { getSemesters } from '@/server/api/user'
import CourseInfo from '@/sub1/pages/mine/course-search/course-info.vue'
import type { Semester } from '@/shared/types/response/semesters'
import type { CourseItem } from '@/sub1/pages/mine/course-search/type'

const listData = ref<CourseItem[]>([])
const input = ref('')
const page = ref(1)
const semesters = ref<Semester[]>([])
const pickerIndex = ref(0)

const semesterNames = computed(() => semesters.value.map(item => item.name))
const semesterCode = computed(() => {
  if (semesters.value.length) {
    return semesters.value[pickerIndex.value].id
  } else {
    return 0
  }
})

getSemesters().then(({ data }) => [
  semesters.value = data.data,
])

const getCourseSearch = () => {
  Toast.loading({
    message: '加载课程信息中...',
    duration: 0,
  })
  courseSearch({
    courseName: input.value,
    page: page.value,
    semesterCode: semesterCode.value,
    size: 999,
  }).then(({ data }) => {
    Toast.clear()
    Toast.success({
      message: `加载完成\n${getRandomQAQ('happy')[0]}`,
    })
    listData.value = data.data.list.map((item, index) => {
      return {
        id: index,
        ...item,
      }
    })
  }).catch(() => {
    Toast.clear()
    Toast.fail({
      message: `加载失败\n${getRandomQAQ('sadness')[0]}`,
      duration: 1000,
    })
  })
}

</script>

<template>
  <div class="w-screen min-h-screen bg-gray-300/25">
    <div class="px-4 pt-2 pb-4 bg-white">
      <picker :range="semesterNames" :value="pickerIndex">
        <div class="flex justify-center">
          <p class="py-2 px-4 rounded-full bg-zinc-50">
            {{ semesterNames[pickerIndex] }}
          </p>
        </div>
      </picker>
      <div class="mt-2 border border-zinc-100 px-4 py-3 flex rounded-full items-center">
        <input v-model="input" class="flex-1" type="text" confirm-type="search" placeholder="请输入课程名称" @confirm="getCourseSearch">
        <van-icon name="search" class="px-3" @click="getCourseSearch" />
      </div>
    </div>
    <CourseSearch v-slot="{item}" :data="listData">
      <CourseInfo :course-info="(item as CourseItem)" />
    </CourseSearch>
  </div>
</template>
