<script setup lang='ts'>
import { ref } from 'vue'
import { useBusSchedule } from './useBusSchedule'
import type { BusQueryData } from '@/shared/types/response/bus-query'
import BounceBall from '@/components/BounceBall/BounceBall.vue'

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
} = useBusSchedule()

const tabBar: Record<keyof BusQueryData, string> = {
  weekday: '周一至周五',
  sat: '周六',
  sun: '周末',
}

const show = ref(false)

// onPullDownRefresh(() => getBusSchedule(true))
getBusSchedule()

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
    <div class="h-[100px] w-full flex justify-around items-center rounded-b-2xl bg-[#4981F9] text-white">
      <h2 class="font-bold w-5/12 flex justify-center" @click="handleCampusCheck(true)">
        {{ startCampus }}
      </h2>
      <div class="h-[40px] w-[40px] relative flex justify-center items-center rounded-full bg-white" @click="handleRotateClick">
        <BounceBall top />
        <img src="./bus-icon.png" class="h-[30px] w-[30px]">
      </div>
      <h2 class="font-bold w-5/12 flex justify-center" @click="handleCampusCheck(false)">
        {{ endCampus }}
      </h2>
    </div>

    <van-tabs :active="busScheduleType" @change="onTabsChange">
      <van-tab v-for="item in Object.keys(tabBar)" :key="item" :title="tabBar[item as keyof BusQueryData]" :name="item">
        <div v-for="schedule in busScheduleList" :key="schedule.startTime" class="flex items-center rounded-xl card-shadow w-[95vw] mx-auto py-2 px-4 border-2 box-border border-gray-100 my-2">
          <p class="mr-4 w-8 flex items-center justify-center">
            {{ schedule.startTime }}
          </p>
          <div class="w-1 h-12 rounded-full bg-[#4981F9]" />
          <div class="ml-3">
            <h3>{{ schedule.runRange[0] }} - {{ schedule.runRange[1] }}</h3>
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
      </van-tab>
    </van-tabs>
  </div>
</template>
