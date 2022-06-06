<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { useCourseListStore } from '@/store/courseList.store'

const store = useCourseListStore()
const { exam } = storeToRefs(store)

onPullDownRefresh(async() => {
  Toast.loading({
    message: `正在加载最新考试信息中...\n${getRandomQAQ('happy')[0]}`,
    duration: 0,
  })
  store.getCourseList(true).then(() => {
    Toast.clear()
    Toast.success({
      message: `加载完成\n${getRandomQAQ('happy')[0]}`,
    })
  }).catch(() => {
    Toast.clear()
    Toast.fail({
      message: `加载失败\n${getRandomQAQ('sadness')[0]}`,
    })
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
})
</script>

<template>
  <van-toast id="van-toast" />
  <div class="min-h-screen w-screen">
    <div class="w-[95vw] mx-auto flex flex-col gap-5 pt-10">
      <div v-if="exam.length === 0">
        <van-empty description="暂时没有考试噢，刷新一下看看" />
      </div>
      <div
        v-for="item in exam"
        :key="item.detail.name"
        class="relative rounded-md card-shadow p-3 text-black/85"
        :class="item.isExpired ? 'bg-gray-200 text-gray-500' : 'bg-white'"
      >
        <template v-if="!item.isExpired">
          <span class="absolute right-2 flex h-3 w-3 animate-bounce">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
              :class="item.isToday ? 'bg-red-400' : ''"
            />
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
              :class="item.isToday ? 'bg-red-500' : ''"
            />
          </span>
        </template>
        <div class="flex flex-col gap-3 text-sm">
          <div class="text-lg w-full flex justify-between">
            <p>{{ item.detail.name }}</p>
            <p v-if="item.isExpired">
              已考完
            </p>
          </div>
          <div class="flex gap-1">
            <van-icon name="underway-o" />
            <p>{{ format(item.startDate, 'MM-dd HH:mm') }} - {{ format(item.endDate, 'HH:mm') }}</p>
          </div>
          <div class="flex gap-1">
            <van-icon name="location-o" />
            <p>{{ item.detail.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
