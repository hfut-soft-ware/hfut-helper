<script lang='ts' setup>
// TODO 增加每月消费的卡片
import { storeToRefs } from 'pinia'
import { useMineStore } from '@/store/mine.store'
import { useRecordedList } from '@/pages/mine/card/use-recordedList'
import { useFlowWaterStore } from '@/store/flowWater.store'

const mineStore = useMineStore()
const { cardInfo } = storeToRefs(mineStore)

const waterFlowStore = useFlowWaterStore()
const {
  consumeRecord,
  handleNextPageClick,
} = useRecordedList(waterFlowStore)

</script>

<template>
  <van-toast id="van-toast" />
  <div class="fixed top-64 right-0 z-[999]">
    <div
      class="settings bg-[#3F51B5] w-[50px] h-[50px] flex justify-center items-center text-white rounded-l-full rounded-tr-full"
      @click="handleNextPageClick"
    >
      <van-icon class="animate-bounce" name="down" />
    </div>
  </div>
  <div class="w-screen min-h-screen bg-[#F1F2F6] pb-5">
    <div class="w-[95vw] mx-auto mt-5">
      <div class="overflow-hidden px-4 py-5 bg-[#283593] rounded-2xl flex-col text-white relative">
        <div class="absolute top-[30px] right-[-50px] w-[210px] h-[210px] rounded-full bg-[#3949AB] opacity-50" />
        <div class="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#3949AB] opacity-80" />
        <div class="p-2 rounded-lg bg-[#3949AB] w-[25px] flex items-center">
          <img src="./img.png" class="w-[25px] h-[25px]">
        </div>
        <h2 class="font-b text-3xl py-3">
          {{ cardInfo.content }}
        </h2>
        <h4 class="text-white/50 text-sm">
          {{ cardInfo.title }}
        </h4>
      </div>
      <div class="flex flex-col gap-5">
        <div
          v-for="(list, day) in consumeRecord"
          :key="day"
          class="flex flex-col mt-5"
        >
          <div class="flex justify-between text-slate-500/80 text-xs">
            <p>
              {{ day }}
            </p>
            <p>{{ list[day] }}</p>
          </div>
          <div class="flex flex-col gap-3 mt-2">
            <div
              v-for="item in list"
              :key="`${item.time}-${item.balance}-${item.type}`"
              class="flex bg-white text-sm justify-between p-5 card-shadow w-full rounded-lg box-border"
            >
              <p>{{ item.merchantName.length > 0 ? item.merchantName : item.consumerType }}</p>
              <p>{{ item.amount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  box-shadow: rgb(63 81 181 / 30%) 0px 12px 14px 0px;
}
</style>
