<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCourseListStore } from '@/store/courseList.store'

const courseStore = useCourseListStore()
const { courseList } = storeToRefs(courseStore)

const finishedCourse = computed(() => courseList.value.filter(item => item.isFinished))
const unFinishedCourse = computed(() => courseList.value.filter(item => !item.isFinished))
const list = computed(() => [...unFinishedCourse.value, ...finishedCourse.value])
const totalCredits = computed(() => {
  let res = 0
  list.value.forEach((item) => {
    res += parseInt(item.detailInfo.credits)
  })
  return res
})
</script>

<template>
  <div class="w-screen min-h-screen bg-[#4981F9] py-5">
    <p class="text-2xl text-white px-[2.5vw]">
      总学分: {{ totalCredits }}
    </p>
    <div class="flex flex-col gap-2">
      <div class="w-[95vw] mx-auto flex flex-col gap-1 mt-5">
        <div
          v-for="item in list"
          :key="item.courseName"
          class="bg-white rounded-md card-shadow py-3 px-5 flex justify-between"
          :class="item.isFinished ? 'finished-text' : ''"
        >
          <div>
            <p :class="item.isFinished ? 'finished-name' : ''">
              {{ item.courseName }}
            </p>
            <div class="mt-2 text-xs text-gray-500">
              <div class="flex gap-2">
                <p>学分:</p>
                <p>{{ item.detailInfo.credits }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-full w-[20px] h-[20px] border-2 border-[#6E6E6E] text-[#6E6E6E] flex items-center justify-center">
            <van-icon v-if="item.isFinished" name="success" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.finished-name {
  @apply line-through;
}
.finished-text {
  @apply text-gray-500;
}
</style>
