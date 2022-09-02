<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useEmptyClassroom } from './use-emptyClassroom'
import { campusInfo, weekDays } from './constant'

const { fromIndex, toIndex, classroomList, params, towerName, campusName, towerList, campusList, getClassroom } = useEmptyClassroom()

getClassroom()

const pickerShow = ref(false)
const columnsIndex = ref(0)
// const pickerButtons = ref([
//   {
//     icon: 'location-o',
//     iconSize: '12px',
//     text: campusName.value,
//   },
//   {
//     icon: 'wap-home-o',
//     iconSize: '14px',
//     text: towerName.value,
//   },
//   {
//     icon: 'calendar-o',
//     iconSize: '14px',
//     text: `第${params.value.week}周`,
//   },
//   {
//     icon: 'notes-o',
//     iconSize: '12px',
//     text: weekDays[params.value.weekDay - 1],
//   },
//   {
//     icon: 'points',
//     iconSize: '12px',
//     text: `${fromIndex.value}~${toIndex.value}`,
//   },
// ])
const fromToList = Array.from<number[], number[]>({ length: 2 }, () => Array.from<number[], number>({ length: 11 }, (_, i) => i + 1))
const columns = computed(() => {
  switch (columnsIndex.value) {
    case 0:
      return campusList
    case 1:
      return towerList.value
    case 2:
      return Array.from({ length: 20 }, (_, i) => `第${i + 1}周`)
    case 3:
      return Array.from({ length: 7 }, (_, i) => weekDays[i])
    case 4:
      return [

        {
          values: fromToList[0],
          className: 'column1',
        },
        {
          values: fromToList[1],
          className: 'column1',
        },
      ]
    default:
      return []
  }
})

const closePicker = () => {
  pickerShow.value = false
}

const onConfirm = (event: any) => {
  const { value, index } = event.detail
  pickerShow.value = false
  switch (columnsIndex.value) {
    case 0:
      params.value.campusCode = campusInfo.find(campus => campus.campusName === value)!.campusCode
      getClassroom()
      break
    case 1:
      towerName.value = value
      break
    case 2:
      params.value.week = index + 1
      getClassroom()
      break
    case 3:
      params.value.weekDay = index + 1
      getClassroom()
      break
    case 4:
      fromIndex.value = value[0]
      toIndex.value = value[1]
      break
    default:
      break
  }
}

const openPickerClick = (index: number) => {
  columnsIndex.value = index
  pickerShow.value = true
}

const onChange = (event: any) => {
  if (columnsIndex.value !== 4) {
    return
  }

  const { picker, value, index } = event.detail
  if (index !== 0) {
    return
  }
  const toList = fromToList[0].filter(item => item >= value[0])
  picker.setColumnValues(1, toList)
}
</script>

<template>
  <van-toast id="van-toast" />
  <van-popup :show="pickerShow" round position="bottom" custom-style="height: 40%" @close="closePicker">
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="closePicker"
      @change="onChange"
    />
  </van-popup>
  <div class="w-screen min-h-screen flex flex-col">
    <div class=" w-[95vw] mx-auto flex gap-3 flex-wrap py-3">
      <div class="flex items-center h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(0)">
        <van-icon name="location-o" size="12px" />
        <p class="text-xs align-middle">
          {{ campusName }}
        </p>
      </div>
      <div class="flex items-center h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(1)">
        <van-icon name="wap-home-o" size="14px" />
        <p class="text-xs align-middle">
          {{ towerName }}
        </p>
      </div>
      <div class="flex items-center h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(2)">
        <van-icon name="calendar-o" size="14px" />
        <p class="text-xs align-middle">
          {{ `第${params.week}周` }}
        </p>
      </div>
      <div class="flex items-center h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(3)">
        <van-icon name="notes-o" size="12px" />
        <p class="text-xs align-middle">
          {{ weekDays[params.weekDay - 1] }}
        </p>
      </div>
      <div class="flex items-center h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(4)">
        <van-icon name="points" size="12px" />
        <p class="text-xs align-middle">
          {{ `${fromIndex}~${toIndex}` }}
        </p>
      </div>
      <!-- <div v-for="(button, index) in pickerButtons" :key="button.icon" class="button" @click="openPickerClick(index)">
        <van-icon name="location-o" :size="button.iconSize" />
        <p class="button-text">
          {{ button.text }}
        </p>
      </div> -->
    </div>
    <div class="h-[2px] w-screen bg-[#e9e8ef]" />
    <div class="w-[95vw] mx-auto mb-2 flex items-center justify-between">
      <p class="text-[10px] font-light">
        数据仅供参考 {{ towerName }} {{ campusName }}
      </p>
      <div class="mt-2 bg-[#fad7d1] p-2 rounded-lg text-gray-600  text-sm leading-[14px]">
        有课
      </div>
    </div>
    <div class="w-[95vw] mx-auto flex flex-col rounded-2xl p-4">
      <div v-for="(roomList, index) in classroomList" :key="index" class="flex gap-3 flex-wrap mb-3">
        <div v-for="room in roomList" :key="room" class="bg-[#fad7d1] p-2 rounded-lg text-gray-600 text-sm leading-[14px]">
          {{ room }}
        </div>
      </div>
    </div>
  </div>
</template>
