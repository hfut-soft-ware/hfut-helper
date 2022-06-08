<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import { useCourseListStore } from '@/store/courseList.store'
import { uesLoverStore } from '@/store/lover.store'

const store = useCourseListStore()

const loverStore = uesLoverStore()

const { weekSchedule, weekScheduleVisibleWeek, currentWeekIdx } = storeToRefs(store)

const { isLoverRelieved, isLover } = storeToRefs(loverStore)

function handleLoverClick() {
  if (isLoverRelieved.value) {
    Dialog.confirm({
      title: '你还没有绑定Ta的课表噢~',
      message: '是否前往绑定?',
    }).then(() => {
      uni.navigateTo({
        url: '/pages/login/login?lover=true',
      })
    })
    return
  }

  isLover.value = !isLover.value
  loverStore.setLover(isLover.value, true)
}
</script>

<template>
  <van-dialog id="van-dialog" />
  <div class="h-[100px] w-screen z-[1] bg-white/30 fixed">
    <template v-if="weekSchedule">
      <div class="absolute bottom-1 w-screen flex flex-col w-[95vw] mx-auto">
        <div class="flex w-[95vw] ml-[2.5vw]">
          <van-icon name="like-o" :class="isLover ? 'text-red-500' : ''" class="text-lg" @click="handleLoverClick" />
          <div class="flex justify-center w-full">
            <div class="flex justify-center mx-[2.5vw]">
              <p>第{{ weekSchedule.weekIdx + 1 }}周 {{ currentWeekIdx === weekSchedule.weekIdx ? '' : `(当前是第${currentWeekIdx + 1}周)` }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-screen mt-2">
          <template v-if="weekScheduleVisibleWeek.course">
            <div
              v-for="weekday in weekScheduleVisibleWeek.week"
              :key="weekday.date"
              class="flex-1 text-xs text-center"
              :class="`${weekday.active ? 'active-day' : ''}`"
            >
              <p>{{ format(weekday.date, 'EEE.') }}</p>
              <p class="text-[10px]">
                {{ format(weekday.date, 'MM/dd') }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.active-day {
  @apply text-[#217DD2] font-bold;
}
</style>
