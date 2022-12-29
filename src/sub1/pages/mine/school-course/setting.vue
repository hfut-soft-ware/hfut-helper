<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useCourseSearchStore } from '@/store/courseSearch.store'

const store = useCourseSearchStore()
const {
  settingShow,
  semesters,
  semesterOptions,
  campuses,
  campusesOptions,
  colleges,
  collegesOptions,
  major,
  majorOptions,
  grads,
  gradsOptions,
  classes,
  classesOptions,
} = storeToRefs(store)

store.getAllCourseOptions()

const selectItems = reactive([
  {
    title: '选择学年',
    columns: semesterOptions,
    show: ref(false),
    value: semesters,
  },
  {
    title: '选择校区',
    columns: campusesOptions,
    show: ref(false),
    value: campuses,
  },
  {
    title: '选择学院',
    columns: collegesOptions,
    show: ref(false),
    value: colleges,
  },
  {
    title: '选择专业',
    columns: majorOptions,
    show: ref(false),
    value: major,
  },
  {
    title: '选择年级',
    columns: gradsOptions,
    show: ref(false),
    value: grads,
  },
  {
    title: '选择班级',
    columns: classesOptions,
    show: ref(false),
    value: classes,
  },
])

function handleQueryClick() {
  store.getAllCourseQuery()
  settingShow.value = false
}

</script>

<template>
  <van-popup
    :show="settingShow"
    round
    closeable
    position="bottom"
    custom-style="height: 90%"
    @close="store.closeSetting"
  >
    <div class="flex flex-col gap-5 w-[90vw] mx-auto">
      <h2 class="font-semibold mt-5 text-center">
        全校课表查询
      </h2>
      <div v-for="item in selectItems" :key="item.title">
        <van-cell-group>
          <div class="flex justify-between p-4 card-shadow rounded-md" @click="item.show = !item.show">
            <p class="text-sm text-gray-500/90">
              {{ item.value }}
            </p>
            <van-icon name="arrow-down" />
          </div>
        </van-cell-group>
        <van-transition name="fade-up" :show="item.show">
          <van-picker
            show-toolbar
            :title="item.title"
            :columns="item.columns"
            :default-index="0"
            @change="(e: any) => item.value = e.detail.value"
            @confirm="item.show = false"
            @cancel="item.show = false"
          />
        </van-transition>
      </div>
      <div
        class="rounded-lg text-white bg-[#4981F9] text-center mt-10 p-3"
        @click="handleQueryClick"
      >
        查询
      </div>
    </div>
  </van-popup>
</template>

<style lang='scss' scoped>

</style>
