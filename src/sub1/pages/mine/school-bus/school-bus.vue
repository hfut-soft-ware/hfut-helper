<script setup lang='ts'>
import { computed, ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getBusRequest } from '@/server/api/others'
import type { BusInfo, BusQueryData } from '@/shared/types/response/bus-query'

const busSchedule = ref<BusQueryData | null>(null)
const busScheduleType = ref<keyof BusQueryData>('weekday')
const startCampus = ref('')
const endCampus = ref('')

const calculateCampus = (index: number): string[] => {
  const set = new Set<string>()
  const busScheduleVal = busSchedule.value
  if (!busScheduleVal) {
    return []
  }
  for (const date of Object.values(busScheduleVal)) {
    date.forEach(item => set.add(item.runRange[index]))
  }
  return Array.from(set)
}

const startCampusList = computed<string []>(() => {
  return calculateCampus(0)
})

const endCampusList = computed<string []>(() => {
  return calculateCampus(1)
})

const busScheduleList = computed<BusInfo[]>(() => {
  if (!busSchedule.value) {
    return []
  }
  return busSchedule.value[busScheduleType.value].filter(item => item.runRange[0] === startCampus.value && item.runRange[1] === endCampus.value)
})

const getBusSchedule = (pullRefresh = false) => {
  Toast.loading({
    message: `获取校车信息...\n${getRandomQAQ('happy')[0]}`,
    forbidClick: true,
  })
  getBusRequest().then(({ data }) => {
    const busInfo = data.data[busScheduleType.value][0]
    startCampus.value = busInfo.runRange[0]
    endCampus.value = busInfo.runRange[1]
    Toast.clear()
    Toast.success({
      message: `加载完成\n${getRandomQAQ('happy')[0]}`,
    })
    busSchedule.value = data.data
  }).catch(() => {
    Toast.clear()
    Toast.fail({
      message: `加载失败\n${getRandomQAQ('sadness')[0]}`,
    })
  })
  if (pullRefresh) {
    uni.stopPullDownRefresh()
  }
}

onPullDownRefresh(() => getBusSchedule(true))
getBusSchedule()
</script>

<template>
  <div class="w-screen min-h-screen">
    <van-toast id="van-toast" />
    <div>{{ busScheduleList[0] }}</div>
    <div>{{ endCampus }}</div>
  </div>
</template>
