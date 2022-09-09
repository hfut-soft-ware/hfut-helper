import { computed, ref, watchEffect } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getBusRequest } from '@/server/api/others'
import type { BusInfo, BusQueryData } from '@/shared/types/response/bus-query'

export function useBusSchedule() {
  const busSchedule = ref<BusQueryData | null>(null)
  const busScheduleType = ref<keyof BusQueryData>('weekday')
  const startCampus = ref('')
  const leftCampusList = ref<string []>([])
  const endCampus = ref('')
  const rightCampusList = ref<string []>([])
  const clickedButton = ref<'left' | 'right'>('left')
  const defaultIndex = ref(0)

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

  watchEffect(() => {
    leftCampusList.value = calculateCampus(0)
    rightCampusList.value = calculateCampus(1)
  })

  const busScheduleList = computed<BusInfo[]>(() => {
    if (!busSchedule.value) {
      return []
    }
    return busSchedule.value[busScheduleType.value].filter(item => item.runRange[0] === startCampus.value && item.runRange[1] === endCampus.value)
  })

  const calculateDefaultIndex = () => {
    if (clickedButton.value === 'left') {
      const index = leftCampusList.value.findIndex(item => item === startCampus.value)
      defaultIndex.value = index > -1 ? index : 0
    } else {
      const index = rightCampusList.value.findIndex(item => item === endCampus.value)
      defaultIndex.value = index > -1 ? index : 0
    }
  }

  const getBusSchedule = () => {
    Toast.loading({
      message: '加载培养方案中...',
      duration: 0,
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
        duration: 1000,
      })
    })
  }

  return {
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
  }
}
