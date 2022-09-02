import { computed, ref, shallowRef, watchEffect } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { campusInfo, lessonStartTimePrefixs } from './constant'
import { getClassroomRequest } from '@/server/api/others'

import type { IEmptyClassroomDto } from '@/shared/types/dto/empty-classroom'
import type { Datum } from '@/shared/types/response/empty-classroom'

function handleClassroom(list: number[]) {
  const set = new Set<number>()
  list.forEach(roomId => set.add(Math.floor(roomId / 100)))
  const classrooms = Array.from<number[], number[]>({ length: set.size }, () => [])
  list.forEach((roomId) => {
    classrooms[Math.floor(roomId / 100) - 1].push(roomId)
  })
  return classrooms
}

export function useEmptyClassroom() {
  const fromIndex = ref(1)
  const toIndex = ref(1)
  const params = ref<IEmptyClassroomDto>({
    campusCode: '01',
    week: 1,
    weekDay: 1,
  })
  const towerName = ref('')
  const campusName = ref('')
  const towerList = ref<string []>([])
  const getClassroomData = shallowRef<Datum[]>([])

  const campusList = campusInfo.map(campus => campus.campusName)

  watchEffect(() => {
    const campus = campusInfo.find(campus => campus.campusCode === params.value.campusCode)!
    towerList.value = campus.towers
    towerName.value = campus.towers[0]
    campusName.value = campus.campusName
  })

  const classroomList = computed(() => {
    const towerMatchedClassroom = getClassroomData.value.filter(classroom => classroom.towerName === towerName.value)
    const list = new Set<number>()
    const fromPrefix = lessonStartTimePrefixs[fromIndex.value]
    const toPrefix = lessonStartTimePrefixs[toIndex.value]
    towerMatchedClassroom.forEach((classroom) => {
      classroom.values.forEach((lesson) => {
        const startTimePrefix = parseInt(lesson.startTime.split(':')[0])
        const endTimePrefix = parseInt(lesson.endTime.split(':')[0])
        if ((fromPrefix >= startTimePrefix && fromPrefix <= endTimePrefix) || (toPrefix >= startTimePrefix && toPrefix <= endTimePrefix)) {
          list.add(classroom.roomId)
        }
      })
    })
    const lessonMatchedClassroom = Array.from(list).sort((a, b) => a - b)
    return handleClassroom(lessonMatchedClassroom)
  })

  function getClassroom() {
    Toast.loading({
      message: `获取教室信息...\n${getRandomQAQ('happy')[0]}`,
      forbidClick: true,
    })

    getClassroomRequest(params.value).then(({ data }) => {
      getClassroomData.value = data.data
      Toast.clear()
    }).catch(() => {
      Toast.clear()
      Toast.fail({
        message: `加载失败\n${getRandomQAQ('sadness')[0]}`,
      })
    })
  }
  return {
    fromIndex,
    toIndex,
    classroomList,
    params,
    towerName,
    campusName,
    towerList,
    campusList,
    getClassroom,
  }
}
