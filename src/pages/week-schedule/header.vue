<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import { useCourseListStore } from '@/store/courseList.store'
import { uesLoverStore } from '@/store/lover.store'
import { useCourseSearchStore } from '@/store/courseSearch.store'

const store = useCourseListStore()
const {
  weekSchedule,
  weekScheduleVisibleWeek,
  currentWeekIdx,
  mainInfo,
} = storeToRefs(store)

defineProps<{
  isLoading: boolean
}>()

const loverStore = uesLoverStore()
const { isLoverRelieved, isLover } = storeToRefs(loverStore)

const courseSearchStore = useCourseSearchStore()
const { mode } = storeToRefs(courseSearchStore)

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
  <div
    class=" w-screen z-[1] bg-white/30 fixed"
    :class="mode === 'normal' ? 'normal-height' : 'search-height'"
  >
    <template v-if="weekSchedule">
      <div class="absolute bottom-1 w-screen flex flex-col w-[95vw] mx-auto">
        <div class="flex w-[95vw] ml-[2.5vw]">
          <van-icon v-if="mode === 'normal'" name="like-o" :class="isLover ? 'text-red-500' : ''" class="text-lg" @click="handleLoverClick" />
          <div class="flex justify-center w-full">
            <div class="flex justify-center mx-[2.5vw]">
              <!-- 加载图标 -->
              <template v-if="isLoading">
                <span class="inline-block relative">
                  <div class="absolute right-2">
                    <van-loading :size="20" color="#1989fa" />
                  </div>
                </span>
              </template>
              <span>第{{ weekSchedule.weekIdx + 1 }}周 {{ currentWeekIdx === weekSchedule.weekIdx ? '' : `${mainInfo === null ? '' : `(当前是第${mainInfo.curWeek}周)`}` }}</span>
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

.normal-height {
  @apply h-[125px];
}

.search-height {
  @apply h-[75px];
}
</style>
