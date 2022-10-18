<script setup lang='ts'>
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useBusSchedule } from './useBusSchedule'
import type { BusQueryData } from '@/shared/types/response/bus-query'

const {
  busScheduleType,
  startCampus,
  endCampus,
  leftCampusList,
  rightCampusList,
  busScheduleList,
  clickedButton,
  defaultIndex,
  getBusSchedule,
  calculateDefaultIndex,
  initData,
} = useBusSchedule()

const tabBar: Record<keyof BusQueryData, string> = {
  weekday: '周一至周五',
  sat: '周六',
  sun: '周末',
}

const show = ref(false)

onPullDownRefresh(() => getBusSchedule())
initData()

const handleRotateClick = () => {
  [endCampus.value, startCampus.value] = [startCampus.value, endCampus.value];
  [rightCampusList.value, leftCampusList.value] = [leftCampusList.value, rightCampusList.value]
}

const onClose = () => {
  show.value = false
}

const handleCampusCheck = (isLeftCampus: boolean) => {
  show.value = true
  clickedButton.value = isLeftCampus ? 'left' : 'right'
}

const onConfirm = (event: any) => {
  show.value = false
  if (clickedButton.value === 'left') {
    startCampus.value = event.detail.value
  } else {
    endCampus.value = event.detail.value
  }
}

const onPickerCancel = () => {
  show.value = false
}

const onTabsChange = (e: any) => {
  busScheduleType.value = (e.detail as { name: keyof BusQueryData }).name
}
</script>

<template>
  <van-popup :show="show" round position="bottom" custom-style="height: 40%" @close="onClose" @after-enter="calculateDefaultIndex()">
    <van-picker
      show-toolbar
      :columns="clickedButton === 'left' ? leftCampusList : rightCampusList"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="onPickerCancel"
    />
  </van-popup>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen">
    <div class="h-[100px] w-full flex items-center rounded-b-2xl bg-[#4981F9] text-white">
      <h2 class="flex-1 font-bold w-5/12 text-center" @click="handleCampusCheck(true)">
        {{ startCampus }}
      </h2>
      <div class="p-3 bg-white rounded-full text-black" @click="handleRotateClick">
        <van-icon class="text-2xl w-[30px] h-[30px] text-black/85" name="replay" />
      </div>
      <h2 class="flex-1 font-bold w-5/12 text-center" @click="handleCampusCheck(false)">
        {{ endCampus }}
      </h2>
    </div>

    <van-tabs :active="busScheduleType" @change="onTabsChange">
      <van-tab v-for="item in Object.keys(tabBar)" :key="item" :title="tabBar[item as keyof BusQueryData]" :name="item">
        <div class="grid gap-3 mt-2">
          <div v-for="schedule in busScheduleList" :key="schedule.startTime" class="flex gap-2 items-center rounded-xl card-shadow w-[95vw] ml-[2.5vw] box-border p-3">
            <p class="text-sm text-center">
              {{ schedule.startTime.padStart(5, '0') }}
            </p>
            <div class="w-1 h-12 rounded-full bg-[#4981F9]" />
            <div class="ml-3 grid gap-1">
              <h3 class="text-sm">
                {{ schedule.runRange[0] }} - {{ schedule.runRange[1] }}
              </h3>
              <p v-if="schedule.passPlace" class="text-xs text-gray-400">
                经停：{{ schedule.passPlace }}
              </p>
              <p v-else class="text-xs text-gray-400">
                无经停站点
              </p>
              <p class="text-xs text-gray-400">
                {{ schedule.startPlace }} {{ schedule.count }}车
              </p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
