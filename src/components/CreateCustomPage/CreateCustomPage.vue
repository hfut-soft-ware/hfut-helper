<script lang='ts' setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { CustomType } from '@/pages/week-schedule/use-customCourse'
import { useCustomCourse } from '@/pages/week-schedule/use-customCourse'
import type { CourseData } from '@/store/courseList.store'
import { useCourseListStore } from '@/store/courseList.store'
import { CARD_COLORS } from '@/shared/constant'
import { uesLoverStore } from '@/store/lover.store'

interface Props {
  name: string
  desc: string
  location: string
  startIndex: number
  currentWeek: number
  type: CustomType
  id: string
  currentDay: number
  title: string
  // 修改课程时判断是否为自定义课程
  isCustom: boolean
  courseData: CourseData
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 1,
  currentDay: 1,
  currentWeek: 1,
  title: '编辑日程',
  isCustom: false,
  type: 'add',
  name: '',
  location: '',
  desc: '',
  id: '',
})

export interface CreateCustomPageEmits {
  (e: 'updated'): void
}

const emit = defineEmits<CreateCustomPageEmits>()

const diyId = ref(props.courseData?.detail?.diyId)

const store = useCourseListStore()

const loverStore = uesLoverStore()
const { isLover } = storeToRefs(loverStore)

const {
  courseDesc,
  courseActive,
  courseLocation,
  courseStep,
  colorActive,
  courseName,
  startIdx,
  endIdx,
  onCourseStepChange,
  handleWeekActiveClick,
  handleAddCourse,
  handleUpdateCourse,
  handleDeleteCourse,
} = useCustomCourse(store, {
  id: diyId.value,
  currentWeek: props.currentWeek,
  desc: props.desc,
  startIndex: props.startIndex,
  location: props.location,
  name: props.name,
  type: props.type,
  currentDay: props.currentDay,
  course: props.courseData,
}, emit)

const handleButtonClick = () => {
  (props.type === 'add' ? handleAddCourse : handleUpdateCourse)()
}
</script>

<template>
  <vant-toast id="van-toast" />
  <div class="flex flex-col gap-3 p-5">
    <div class="text-center font-semibold">
      {{ props.title }}
    </div>
    <div class="flex flex-col gap-3">
      <div v-if="isCustom" class="w-full bg p-4 bg-gray-500/20 rounded-lg box-border flex justify-between">
        <p class="flex-[5] font-semibold">
          日程名
        </p>
        <input v-model="courseName" placeholder="必填" class="flex-1">
      </div>
      <div v-if="isCustom" class="w-full bg p-4 bg-gray-500/20 rounded-lg box-border flex justify-between">
        <p class="flex-[5] font-semibold">
          地点
        </p>
        <input v-model="courseLocation" placeholder="选填" class="flex-1">
      </div>
      <div class="w-full bg p-4 bg-gray-500/20 rounded-lg box-border flex justify-between">
        <p class="flex-[5] font-semibold">
          备注
        </p>
        <input v-model="courseDesc" placeholder="选填" class="flex-1">
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <p class="font-semibold">
          上课节数
        </p>
        <p class="text-black/50 text-xs">
          {{ startIdx + 1 }} - {{ endIdx }}节
        </p>
      </div>
      <van-stepper integer min="1" max="4" :value="courseStep" @change="onCourseStepChange" />
    </div>
    <div class="flex gap-2 flex-wrap">
      <template v-for="item in 20" :key="item">
        <div
          class="flex-[15%] text-center bg-gray-500/20 py-2 text-xs rounded-lg text-gray-500/60"
          :class="courseActive.includes(item) ? 'week-active' : ''"
          @click="handleWeekActiveClick(item)"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        颜色
      </p>
      <div class="flex flex-wrap">
        <div
          v-for="color in CARD_COLORS"
          :key="color"
          class="flex-[20%] mt-2"
        >
          <div
            class="w-[50px] h-[50px] rounded-full"
            :class="`${color} ${color === colorActive ? 'color-active' : ''}`"
            @click="colorActive = color"
          />
        </div>
      </div>
    </div>
    <div v-if="!isLover" class="flex gap-2 w-[90vw] mx-auto">
      <div
        class="flex-1 box-border border-[1px] mt-5 border-[#5079D0] font-semibold text-center py-3 px-5 rounded-full text-[#4C81F8]"
        @click="() => handleButtonClick()"
      >
        {{ type === 'add' ? '添加' : '更新' }}
      </div>
      <div
        v-if="type === 'update'"
        class="flex-1 border-[1px] mt-5 border-red-500 font-semibold text-center py-3 px-5 rounded-full text-red-500"
        @click="handleDeleteCourse"
      >
        删除
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@mixin generateCardStyle($bgColor) {
  background: $bgColor;
}

.week-active {
  @apply bg-blue-500 text-white;
}

.color-active {
  @apply  border-2 border-blue-500;
}

.yellow {
  @include generateCardStyle(#FCEBCD);
}
.light-yellow {
  @include generateCardStyle(#FCEBCF);
}
.light-blue {
  @include generateCardStyle(#E6F4FF);
}
.blue {
  @include generateCardStyle(#E6F3FE);
}
.pink {
  @include generateCardStyle(#FFEEF8);
}
.red {
  @include generateCardStyle(#FFEFF0);
}
.grown {
  @include generateCardStyle(#FFF9C9);
}
.light-green {
  @include generateCardStyle(#DEFBF7);
}
.green {
  @include generateCardStyle(#E2F9F3);
}
.blue {
  @include generateCardStyle(#E6F4FF);
}
.purple {
  @include generateCardStyle(#FAEDFF);
}
</style>
