<script lang='ts' setup>
// TODO 增加每月消费的卡片
import { computed, watch } from 'vue'
import { format } from 'date-fns'
import { isArray } from 'lodash'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { getCardBaseInfo } from '@/pages/mine/constant'
import { useFlorWaterQuery } from '@/pages/mine/card/use-florWaterQuery'
import type { IFlowWaterData } from '@/shared/types/response/flowWater'
import { set } from '@/shared/utils/object'

const baseCardInfo = getCardBaseInfo()

const { state } = useFlorWaterQuery()

onPullDownRefresh(() => {
  const { state: newState } = useFlorWaterQuery()

  watch(newState, (newVal) => {
    state.value = newVal
  })
})

const consumeRecord = computed(() => {
  const data = state.value.data.data

  const list: Record<string, IFlowWaterData['list'] & { total: number }> = {}

  data.list.forEach((item) => {
    const dateKey = format(new Date(item.time), 'yyyy-MM-dd')
    if (!isArray(list[dateKey])) {
      set(list, dateKey, [])
    }
    list[dateKey].push(item)
  })

  Object.entries(list).forEach(([key, val]) => {
    let total = 0
    val.forEach((item) => {
      const consumed = parseFloat(item.amount)
      total += consumed
    })

    set(list[key], 'total', total)
  })

  return list
})
</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen bg-[#F1F2F6] pb-5">
    <div class="w-[95vw] mx-auto mt-5">
      <div class="overflow-hidden px-4 py-5 bg-[#5D35B0] rounded-2xl flex-col text-white relative">
        <div class="absolute top-[30px] right-[-50px] w-[210px] h-[210px] rounded-full bg-[#4527A0] opacity-50" />
        <div class="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#4527A0] opacity-80" />
        <div class="p-2 rounded-lg bg-[#45289F] w-[25px] flex items-center">
          <img src="./img.png" class="w-[25px] h-[25px]">
        </div>
        <h2 class="font-b text-3xl py-3">
          {{ baseCardInfo.content }}
        </h2>
        <h4 class="text-white/50 text-sm">
          {{ baseCardInfo.title }}
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
