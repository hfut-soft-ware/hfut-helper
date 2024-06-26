<script setup lang='ts'>
import { computed, ref } from 'vue'
import type { IClassroom } from './use-emptyClassroom'
import { useEmptyClassroom } from './use-emptyClassroom'
import { campusInfo, weekDays } from './constant'

const {
  fromIndex,
  toIndex,
  classroomList,
  params,
  towerName,
  campusName,
  towerList,
  campusList,
  daySchedule,
  getClassroom,
} = useEmptyClassroom()

getClassroom()

const pickerShow = ref(false)
const columnsIndex = ref(0)
// picker 组件的默认选中项， 不生效
const defaultIndex = ref(0)
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
          // 默认选中项
          defaultIndex: fromIndex.value - 1,
        },
        {
          values: fromToList[1],
          // 默认选中项
          defaultIndex: toIndex.value - 1,
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
  // 修改对应的默认选中项
  if (index === 4) {
    defaultIndex.value = 0
  } else {
    switch (index) {
      case 0:
        // eslint-disable-next-line no-case-declarations
        const name = campusInfo.find(campus => campus.campusCode === params.value.campusCode)!.campusName
        defaultIndex.value = campusList.findIndex(campus => campus === name)
        break
      case 1:
        defaultIndex.value = towerList.value.findIndex(tower => tower === towerName.value)
        break
      case 2:
        defaultIndex.value = daySchedule.weekIdx!
        break
      case 3:
        defaultIndex.value = daySchedule.dayIdx!
        break
      default:
        break
    }
  }
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

const handleRoomCardClick = (room: IClassroom) => {
  uni.showModal({
    title: `${towerName.value} ${room.id}`,
    content: `上课节数: ${room.lessonIndex}`,
    showCancel: false,
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <van-popup :show="pickerShow" round position="bottom" custom-style="height: 40%" @close="closePicker">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="closePicker"
      @change="onChange"
    />
  </van-popup>

  <div class="w-screen min-h-screen flex flex-col box-border px-[5vw]">
    <div class="flex gap-3 flex-wrap py-3 box-border">
      <template
        v-for="(item, index) in [
          {icon: 'location-o', value: campusName},
          {icon: 'wap-home-o', value: towerName},
          {icon: 'calendar-o', value: `第${params.week}周`},
          {icon:'notes-o', value: weekDays[params.weekDay - 1]},
          {icon: 'points', value: `${fromIndex}~${toIndex}节`}
        ]"
        :key="item.icon"
      >
        <div class="flex gap-1 items-center bg-[#4297FD] h-6 px-3 rounded-full border-[#e9e8ef] border-[1px]" @click="openPickerClick(index)">
          <van-icon class="text-white" :name="item.icon" size="14px" />
          <p class="text-xs text-center text-white">
            {{ item.value }}
          </p>
        </div>
      </template>
    </div>
    <div class="h-[2px] w-screen bg-[#e9e8ef]" />
    <div class="mb-2 flex items-center justify-between">
      <p class="text-[10px] font-light">
        数据仅供参考 {{ towerName }} {{ campusName }}
      </p>
      <div class="flex gap-2">
        <template
          v-for="item in [
            {class: 'empty-full', content: '有课'},
            {class: 'empty-partial', content: '部分有课'}
          ]"
          :key="item.class"
        >
          <div :class="`mt-2 px-3 py-2 rounded-md font-bold text-xs ${item.class}`">
            {{ item.content }}
          </div>
        </template>
      </div>
    </div>
    <template v-if="classroomList.length">
      <div class="grid gap-2 rounded-2xl py-2">
        <div v-for="(roomList, index) in classroomList" :key="index" class="grid gap-2">
          <template v-if="roomList.length">
            <p class="text-sm font-bold">
              第{{ index + 1 }}层
            </p>
            <div class="flex gap-3 flex-wrap mb-3">
              <div
                v-for="room in roomList" :key="room.id"
                :class="`p-2 rounded-md font-bold text-center text-sm ${room.type === 'full' ? 'empty-full' : 'empty-partial'}`"
                @click="handleRoomCardClick(room)"
              >
                {{ room.id }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <van-empty description="教室都在空闲中" />
    </template>
  </div>
</template>

<style scoped>
.empty-full {
  @apply text-[#C15238] bg-[#FBD6D2];
}

.empty-partial {
  @apply text-[#B97C26] bg-[#FFF2C6];
}
</style>
