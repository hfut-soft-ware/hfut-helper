<script setup lang='ts'>
import { ref } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { handleError } from '@/shared/utils/index'
import CardContainer from '@/sub1/component/card-container/CardContainer.vue'
import SemestersPicker from '@/sub1/component/semesters-picker/SemestersPicker.vue'
import { courseSearch } from '@/server/api/course'
import CourseInfo from '@/sub1/pages/mine/course-search/course-info.vue'
import { useRequestSemesters } from '@/shared/hooks/useRequestSemesters'
import type { Semester } from '@/shared/types/response/semesters'
import type { CourseItem } from '@/sub1/pages/mine/course-search/type'

const listData = ref<CourseItem[]>([])
const input = ref('')
const page = ref(1)
const semester = ref<Semester>()

const { semesters } = useRequestSemesters()

const getCourseSearch = () => {
  Toast.loading({
    message: '加载课程信息中...',
    duration: 0,
  })
  courseSearch({
    courseName: input.value,
    page: page.value,
    semesterCode: semester.value?.id || 0,
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
  }).catch((error) => {
    handleError(error)
  })
}

</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen bg-gray-300/25">
    <div class="px-4 pt-2 pb-4 bg-white">
      <SemestersPicker v-slot="{semester: semesterValue}" :semesters="semesters" @change="(value) => semester = value">
        <div class="flex justify-center">
          <p class="py-2 px-4 rounded-full bg-zinc-50">
            {{ semesterValue.name }}
          </p>
        </div>
      </SemestersPicker>
      <div class="mt-2 border border-zinc-100 px-4 py-3 flex rounded-full items-center">
        <input v-model="input" class="flex-1" type="text" confirm-type="search" placeholder="请输入课程名称" @confirm="getCourseSearch">
        <van-icon name="search" class="px-3" @click="getCourseSearch" />
      </div>
    </div>
    <CardContainer v-slot="{item}" :data="listData">
      <CourseInfo :course-info="(item as CourseItem)" />
    </CardContainer>
  </div>
</template>
