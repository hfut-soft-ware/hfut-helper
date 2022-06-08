<script lang='ts' setup>
import { reactive, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import type { TColors } from '@/shared/constant'
import { CARD_COLORS } from '@/shared/constant'
import { useCourseListStore } from '@/store/courseList.store'

const props = withDefaults(defineProps<{
  currentWeek: number
  startIndex: number
}>(), {
  startIndex: 0,
  currentWeek: 0,
})

const courseStore = useCourseListStore()

const courseName = ref('')
const courseLocation = ref('')
const courseStep = ref(props.startIndex + 1)
const courseActive = reactive([props.currentWeek])

const colorActive = ref<TColors>(CARD_COLORS[0] as TColors)

function onCourseStepChange(step: any) {
  courseStep.value = step.detail
}

function handleWeekActiveClick(weekIdx: number) {
  if (courseActive.includes(weekIdx)) {
    const idx = courseActive.findIndex(item => item === weekIdx)
    courseActive.splice(idx, 1)
    return
  }
  courseActive.push(weekIdx)
}

function handleAddCourse() {
  if (courseName.value.length === 0) {
    Toast('请填写日程名')
    return
  }
}
</script>

<template>
  <vant-toast id="van-toast" />
  <div class="w-[95vw] mx-auto flex flex-col gap-5 py-3">
    <h2 class="text-base font-semibold text-center">
      编辑课程
    </h2>
    <div class="flex flex-col gap-2">
      <div class="w-full bg p-4 bg-gray-500/20 rounded-lg box-border flex justify-between">
        <p class="flex-[5] font-semibold">
          日程名
        </p>
        <input v-model="courseName" placeholder="必填" class="flex-1">
      </div>
      <div class="w-full bg p-4 bg-gray-500/20 rounded-lg box-border flex justify-between">
        <p class="flex-[5] font-semibold">
          地点
        </p>
        <input v-model="courseLocation" placeholder="选填" class="flex-1">
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <p class="font-semibold">
          上课节数
        </p>
        <p class="text-black/50 text-xs">
          {{ startIndex + 1 }} - {{ courseStep }}节
        </p>
      </div>
      <van-stepper integer min="1" max="4" :value="courseStep" @change="onCourseStepChange" />
    </div>
    <div class="flex gap-2 flex-wrap">
      <template v-for="item in Array.from({length: 20}, (_, idx) => idx)" :key="item">
        <div
          class="flex-1 text-center bg-gray-500/20 px-5 py-2 text-xs rounded-lg text-gray-500/60"
          :class="courseActive.includes(item) ? 'week-active' : ''"
          @click="handleWeekActiveClick(item)"
        >
          {{ item + 1 }}
        </div>
      </template>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        颜色
      </p>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="color in CARD_COLORS" :key="color"
          class="flex-1 h-[50px] rounded-full"
          :class="`${color} ${color === colorActive ? 'color-active' : ''}`"
          @click="colorActive = color"
        />
      </div>
    </div>

    <div
      class="border-[1px] mt-5 border-[#5079D0] font-semibold text-center py-3 px-5 rounded-full text-[#4C81F8]"
      @click="handleAddCourse"
    >
      确认添加
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
