<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { computed } from 'vue'
import { getCourseDate, useCourseListStore } from '@/store/courseList.store'
import IconButton from '@/components/base/IconButton.vue'
import { useSelectCourseList } from '@/shared/hooks/use-selectCourseList'

const store = useCourseListStore()

const { onPrev, onNext } = useSelectCourseList(store)

const { mainInfo, daySchedule, todayCourse, dayScheduleVisibleWeek } = storeToRefs(store)

const visibleDate = computed(() => {
  const dayVal = daySchedule.value

  return format(getCourseDate({
    day: dayVal.dayIdx!,
    week: dayVal.weekIdx!,
    startTime: mainInfo.value.semesterStartDate,
  }), 'MM月dd号')
})

function handleActiveChange(idx: number) {
  store.setDaySchedule({ dayIdx: idx })
}

</script>

<template>
  <div class="header">
    <div class="flex flex-col">
      <div class="font-medium text-xl leading-8">
        <div class="font-bold text-ls">
          {{ visibleDate }}
        </div>
        <div class="flex todo-list text-xs font-normal text-[#9499AA]">
          你今天有
          <div class="text-[#4981F9] font-medium">
            {{ todayCourse.length }}
          </div>
          节课
        </div>
      </div>
      <div class="flex justify-between">
        <IconButton @click="onPrev">
          <van-icon name="arrow-left" class="text-slate-400" />
        </IconButton>
        <div class="flex items-center">
          第{{ daySchedule?.weekIdx + 1 }}周
        </div>
        <IconButton @click="onNext">
          <van-icon name="arrow" class="text-slate-400" />
        </IconButton>
      </div>
    </div>

    <div class="card-container">
      <div
        v-for="(card, index) in dayScheduleVisibleWeek.week"
        :key="card.date"
        :class="`card flex flex-col text-slate-400 ${card.active?'card-active' : ''}`"
        @click="handleActiveChange(index)"
      >
        <div style="font-size: 12px;text-align: center">
          {{ format(card.date, 'EEE.') }}
        </div>
        <div class="mt-1" style="font-size: 13px;text-align: center">
          {{ format(card.date, 'dd') }}
        </div>
      </div>
    </div>
  </div>
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
