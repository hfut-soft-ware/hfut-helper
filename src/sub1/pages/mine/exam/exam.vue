<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { format, formatDistanceToNow } from 'date-fns'
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
  }).catch((error) => {
    Toast.clear()
    Toast.fail({
      message: `加载失败\n${getRandomQAQ('sadness')[0]}\n${error.message}`,
    })
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
})

</script>

<template>
  <van-toast id="van-toast" />
  <div class="min-h-screen w-screen bg-gray-300/10 pb-5">
    <div class="w-[95vw] mx-auto flex flex-col gap-5 pt-10">
      <template v-if="!exam?.length">
        <van-empty description="暂时没有考试噢，刷新一下看看" />
      </template>
      <template v-else>
        <div
          v-for="item in exam"
          :key="item?.detail?.name"
          class="relative rounded-md card-shadow p-3 text-black/85"
          :class="item?.isExpired ? 'bg-gray-200 text-gray-500' : 'bg-white'"
        >
          <template v-if="!item?.isExpired">
            <div class="absolute right-2">
              <div class="animate-bounce absolute right-2 flex justify-items-end items-center">
                <span class="animate-ping h-2 w-2 absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </div>
              <div class="flex font-semibold">
                <div class="text-red-500/80">
                  {{ formatDistanceToNow(item?.startDate) }}
                </div>
              </div>
            </div>
          </template>
          <div class="flex flex-col gap-3 text-sm text-black/85">
            <div class="w-full flex justify-between">
              <p class="w-8/12">
                {{ item?.detail?.name }}
              </p>
              <p v-if="item?.isExpired">
                已考完
              </p>
            </div>
            <div class="flex gap-1">
              <van-icon name="underway-o" />
              <p>{{ format(item?.startDate, 'MM-dd HH:mm') }} - {{ format(item?.endDate, 'HH:mm') }}</p>
            </div>
            <div class="flex gap-1">
              <van-icon name="location-o" />
              <p>{{ item.detail.position }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
