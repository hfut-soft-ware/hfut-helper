import { computed, ref, shallowRef, watchEffect } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { campusInfo, courseStartTimePrefixs, lessonStartTimePrefixs } from './constant'
import { getClassroomRequest } from '@/server/api/others'
import { useCourseListStore } from '@/store/courseList.store'
import { getUserData } from '@/store/auth.store'

import type { IEmptyClassroomDto } from '@/shared/types/dto/empty-classroom'
import type { Datum } from '@/shared/types/response/empty-classroom'

interface Classroom {
  id: number
  type: 'partial' | 'full'
}

function handleClassroom(map: Map<number, number[]>, fromIndex: number, toIndex: number) {
  const set = new Set<number>()
  for (const id of map.keys()) {
    set.add(Math.floor(id / 100))
  }
  const layers = Array.from(set).sort((a, b) => a - b)
  const classrooms = Array.from<Classroom[], Classroom[]>({ length: layers.length ? layers.pop()! : 0 }, () => [])
  for (const id of map.keys()) {
    classrooms[Math.floor(id / 100) - 1].push({
      id,
      type: judgeRoomType(map.get(id)!, fromIndex, toIndex, id),
    })
  }
  return classrooms
}

function judgeRoomType(startPrefix: number[], fromIndex: number, toIndex: number, id: number): Classroom['type'] {
  if (fromIndex === toIndex) {
    return 'full'
  }
  startPrefix.sort((a, b) => a - b)
  const matchArr = courseStartTimePrefixs.slice(searchIndex(lessonStartTimePrefixs[fromIndex], courseStartTimePrefixs, true), searchIndex(lessonStartTimePrefixs[toIndex], courseStartTimePrefixs, true) + 1)
  if (matchArr.every((value, index) => value === startPrefix[index])) {
    return 'full'
  } else {
    return 'partial'
  }
}

function searchIndex(target: number, nums: number[], isCourse = false) {
  if (target < 8) {
    return 1
  }
  if (target > 21) {
    return 11
  }
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const middle = left + right >> 1
    if (nums[middle] > target) {
      right = middle - 1
    } else if (nums[middle] < target) {
      left = middle + 1
    } else {
      return middle
    }
  }
  if (isCourse) {
    return left - 1
  } else {
    return left
  }
}

export function useEmptyClassroom() {
  const courseListStore = useCourseListStore()
  const userData = getUserData()

  const targetIndex = searchIndex(new Date().getHours(), lessonStartTimePrefixs)
  const fromIndex = ref(targetIndex)
  const toIndex = ref(targetIndex)
  const params = ref<IEmptyClassroomDto>({
    campusCode: campusInfo.find(campus => campus.campusName === userData.campus)!.campusCode,
    week: courseListStore.daySchedule.weekIdx! + 1,
    weekDay: courseListStore.daySchedule.dayIdx! + 1,
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
    const map = new Map<number, number[]>()
    const fromPrefix = lessonStartTimePrefixs[fromIndex.value]
    const toPrefix = lessonStartTimePrefixs[toIndex.value]
    towerMatchedClassroom.forEach((classroom) => {
      classroom.values.forEach((lesson) => {
        const startTimePrefix = parseInt(lesson.startTime.split(':')[0])
        const endTimePrefix = parseInt(lesson.endTime.split(':')[0])
        if ((fromPrefix >= startTimePrefix && fromPrefix <= endTimePrefix) || (toPrefix >= startTimePrefix && toPrefix <= endTimePrefix)) {
          if (map.has(classroom.roomId)) {
            map.get(classroom.roomId)!.push(startTimePrefix)
          } else {
            map.set(classroom.roomId, <number[]>[])
            map.get(classroom.roomId)!.push(startTimePrefix)
          }
        }
      })
    })
    return handleClassroom(map, fromIndex.value, toIndex.value)
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
    daySchedule: courseListStore.daySchedule,
    getClassroom,
  }
}
