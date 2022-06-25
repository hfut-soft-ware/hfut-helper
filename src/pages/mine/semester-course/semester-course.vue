<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useCourseListStore } from '@/store/courseList.store'

const courseStore = useCourseListStore()
const { courseList } = storeToRefs(courseStore)
</script>

<template>
  <div class="w-screen min-h-screen bg-[#4981F9] py-5">
    <p class="text-2xl text-white px-[2.5vw]">
      总学分: 35.75
    </p>
    <div class="w-[95vw] mx-auto flex flex-col gap-1 mt-5">
      <div
        v-for="item in courseList"
        :key="item.courseName"
        class="opacity-90 bg-white rounded-md card-shadow py-3 px-5 flex justify-between"
      >
        <div>
          <p>
            {{ item.courseName }}
          </p>
          <div class="mt-2 text-xs text-gray-500">
            <div class="flex gap-2">
              <p>学分:</p>
              <p>{{ item.detailInfo.credits }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-full w-[25px] h-[25px] border-2 border-[#6E6E6E] text-[#6E6E6E] flex items-center justify-center">
          <van-icon v-if="item.isFinished" name="success" />
        </div>
      </div>
    </div>
  </div>
</template>
