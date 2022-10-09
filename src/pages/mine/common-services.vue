<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { servicesButtonList, servicesList } from '@/pages/mine/constant'
import { useCourseListStore } from '@/store/courseList.store'
import { useMineStore } from '@/store/mine.store'

const mineStore = useMineStore()
const { cardInfo } = storeToRefs(mineStore)

const courseStore = useCourseListStore()
const { recentExam } = storeToRefs(courseStore)

function onServiceClick(url: string, isAppId = false) {
  if (isAppId) {
    uni.navigateToMiniProgram({
      appId: url,
    })
  } else {
    uni.navigateTo({
      url: `/sub1/pages/mine/${url}`,
    })
  }
}

</script>

<template>
  <div class="w-full rounded-xl card-shadow flex py-5">
    <div class="base-info-card border-r-[1px] border-r-[#E5E8EB]">
      <p class="font-semibold text-md" @click="onServiceClick('card/card')">
        {{ cardInfo?.title }}
      </p>
      <p class="text-sm text-[#637381]">
        {{ cardInfo?.content }}
      </p>
    </div>
    <div class="base-info-card" @click="onServiceClick('exam/exam')">
      <p class="font-semibold text-md">
        {{ recentExam?.length || 0 }}门
      </p>
      <p class="text-sm text-[#637381]">
        最近考试安排
      </p>
    </div>
  </div>

  <div class="mt-5 py-2 rounded-xl card-shadow flex flex-wrap">
    <div
      v-for="service in servicesButtonList"
      :key="service.icon"
      class="w-1/4 flex items-center justify-center"
      @click="onServiceClick(service.url, !!service.isAppIdUrl)"
    >
      <div class="py-2 px-3 flex flex-col items-center justify-center">
        <img
          class="w-[30px] h-[30px]"
          :src="`../../assets/icons/${service.icon}.png`"
        >
        <p class="text-xs mt-2">
          {{ service.title }}
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-3 mt-5">
    <div
      v-for="service in servicesList"
      :key="service.icon"
      class="card-shadow rounded-xl w-full p-5 items-center box-border flex justify-between"
      @click="onServiceClick(service.url)"
    >
      <img
        class="w-[30px] h-[30px]"
        :src="`../../assets/icons/${service.icon}.png`"
      >
      <p class="font-semibold text-sm">
        {{ service.title }}
      </p>
      <van-icon name="arrow" />
    </div>
  </div>
</template>
<style lang='scss' scoped>
.base-info-card {
  @apply flex flex-col items-center gap-1 flex-1;
}

</style>
