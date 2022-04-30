<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { format } from 'date-fns'
import IconButton from '@/components/base/IconButton.vue'
import { useCourseListStore } from '@/store/courseList.store'
import { existProperty } from '@/shared/utils'

const store = useCourseListStore()

const { visibleWeekIdx, weekdays, visibleDayIdx, todayCourse } = storeToRefs(store)

const currentCourse = computed(() => {
  const todayCourseVal = todayCourse.value
  if (!existProperty(todayCourseVal)) {
    return []
  }

  return todayCourseVal.filter(item => existProperty(item.course))
})

function onPrev() {
  if (visibleWeekIdx.value === 0) {
    store.setVisibleWeekIdx(19)
  } else {
    store.setVisibleWeekIdx(visibleWeekIdx.value - 1)
  }
}
function onNext() {
  if (visibleWeekIdx.value === 19) {
    store.setVisibleWeekIdx(0)
  } else {
    store.setVisibleWeekIdx(visibleWeekIdx.value + 1)
  }
}

function handleActiveChange(idx: number) {
  store.setVisibleDayIdx(idx)
}

</script>

<template>
  <view class="header">
    <view class="flex flex-col">
      <view class="font-medium text-xl leading-8">
        <view class="font-bold text-ls">
          {{ format(weekdays[visibleDayIdx].date, 'MM月dd号') }}
        </view>
        <view class="flex todo-list text-xs font-normal text-[#9499AA]">
          你今天有
          <view class="text-[#4981F9] font-medium">
            {{ currentCourse.length }}
          </view>
          节课
        </view>
      </view>
      <view class="flex justify-between">
        <IconButton @click="onPrev">
          <van-icon name="arrow-left" class="text-slate-400" />
        </IconButton>
        <view class="flex items-center">
          第{{ visibleWeekIdx + 1 }}周
        </view>
        <IconButton @click="onNext">
          <van-icon name="arrow" class="text-slate-400" />
        </IconButton>
      </view>
    </view>

    <view class="card-container">
      <view
        v-for="card in weekdays"
        :key="card.weekday"
        :class="`card flex flex-col text-slate-400 ${card.active?'card-active' : ''}`"
        @click="handleActiveChange(card.idx)"
      >
        <view style="font-size: 12px;text-align: center">
          {{ card.weekday }}
        </view>
        <view class="mt-1" style="font-size: 13px;text-align: center">
          {{ card.day }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.header {
  @apply w-[95vw] m-auto;
  .select {
    @apply flex justify-between;
  }
}
.card-container {
  @apply relative flex mt-[10px] gap-2;
  .card {
    transition: all 200ms linear;
    @apply flex-1 rounded-md bg-[#EDEFF3] py-3;
  }
}

.card-active {
  @apply bg-[#4981F9] shadow-lg shadow-blue-500/60 text-white #{!important};
}
</style>
