import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { useAsyncState } from '@vueuse/core'
import _ from 'lodash'
import type { WeekDays } from '@/shared/types'
import { activeWeekIdx, buildWeek, currentDayIdx } from '@/shared/constant'
import { courseList } from '@/_mock_/auth'
import { getCourseListLayoutRequest } from '@/server/api/eam'
import type { Lessons } from '@/shared/types/course'

const { state: layout } = useAsyncState(getCourseListLayoutRequest().then((res: any) => transformLayout(res.result.courseUnitList)), {} as any)

function transformLayout(list: any[]) {
  return list.filter((item: any, idx: number) => idx % 2 === 0 && item.startTime <= 1900)
    .map((item: any, idx) => {
      const end = list[2 * idx + 1]
      return {
        index: Math.ceil(item.indexNo as number / 2),
        startTime: item.startTime,
        endTime: end.endTime,
        startTimeText: item.startTimeText,
        endTimeText: end.endTimeText,
        course: {},
      }
    })
}

function transformCourse(course: ICourseList) {
  const { scheduleList } = course
  const res = Object.create(null)

  const transformTime = (time: number) => {
    const hour = Math.floor(time / 100).toString().padStart(2, '0')
    const minute = Math.floor(time % 100).toString().padEnd(2, '0')
    return `${hour}:${minute}`
  }

  let prevDate: string

  scheduleList.forEach((list) => {
    const layoutVal = _.cloneDeep(layout.value)

    if (!res[list.date]) {
      res[list.date] = layoutVal
    }

    const lessonDetail = getCourseDetail(course, list)

    if (
      prevDate && list.date === prevDate
      && res[prevDate][res[prevDate].length - 1]?.course?.lessonDetail?.id === list.lessonId
    ) {
      return
    }

    let idx = layoutVal.find((item: ScheduleList) => item.startTime === list.startTime).index - 1

    prevDate = list.date

    res[list.date][idx].course = {
      startTime: transformTime(list.startTime),
      endTime: transformTime(list.endTime),
      sortTime: list.startTime,
      teachers: lessonDetail!.teacherAssignmentList,
      index: idx,
      lessonDetail,
      room: list.room,
    }
  })

  Object.keys(res).forEach((key) => {
    res[key].sort((a: any, b: any) => {
      return a.startTime - b.startTime
    })
  })
  return {
    ...res,
    detailList: course.lessons,
  }
}

function getCourseDetail(course: ICourseList, list: ScheduleList) {
  const { lessons } = course

  return lessons.find(item => item.id === list.lessonId)
}

interface CourseStore {
  course: ICourseList
  visibleDayIdx: number
  visibleWeekIdx: number
}

interface CourseGetters {
  visibleWeek: (state: CourseStore) => Date[]
  weekdays: (state: CourseStore) => WeekDays
  currentWeekCourse: (state: CourseStore) => any
  todayCourse: (state: CourseStore) => any[]
  [key: string]: any
}

interface CourseActions {
  setVisibleDayIdx: (idx: number) => void
  setVisibleWeekIdx: (idx: number) => void
  setCourse: (course: ICourseList) => void
  isCourseExist: () => boolean
}

export const useCourseListStore = defineStore<string, CourseStore, CourseGetters, CourseActions>('course-list', {
  state: () => ({
    course: transformCourse(courseList as unknown as ICourseList),
    visibleDayIdx: currentDayIdx,
    visibleWeekIdx: activeWeekIdx,
  }),
  getters: {
    visibleWeek(state: CourseStore) {
      return buildWeek(state.visibleWeekIdx)
    },
    weekdays(state: CourseStore) {
      return this.visibleWeek.map((day, idx) => ({
        weekday: `${format(day, 'E')}.`,
        day: format(day, 'd'),
        date: day,
        active: state.visibleDayIdx === idx,
        idx,
      }))
    },
    currentWeekCourse(state: CourseStore) {
      return this.weekdays.map(day => (state.course as any)[format(day.date, 'yyy-MM-dd')] || {})
    },
    todayCourse(state: CourseStore) {
      return this.currentWeekCourse[state.visibleDayIdx]
    },
  },
  actions: {
    setVisibleDayIdx(idx) {
      this.visibleDayIdx = idx
    },
    setVisibleWeekIdx(idx) {
      this.visibleWeekIdx = idx
    },
    setCourse(course: ICourseList) {
      this.course = transformCourse(course)
    },
    isCourseExist() {
      return Object.keys(this.course).length === 0
    },
  },
})

export interface ICourseList {
  lessonList: LessonList[]
  scheduleList: ScheduleList[]
  scheduleGroupList: ScheduleGroupList[]
  lessons: Lessons[]
}

export interface ICourse {
  lessonDetail: LessonList
  [key: string]: any
}

interface Adminclasses {
  id: number
  nameZh: string
  nameEn: string
  code: string
  grade: string
  stdCount: number
  planCount: number
  enabled: boolean
  abbrZh: string
  abbrEn: string
}

interface Building {
  id: number
  nameZh: string
  nameEn: string
  code: string
  campus: Campus
}

interface Campus {
  id: number
  nameZh: string
  nameEn: string
  code: string
}

export interface LessonList {
  id: number
  code: string
  name: string
  courseName: string
  courseTypeName: string
  teacherAssignmentList: TeacherAssignmentList[]
  requiredPeriodInfo: RequiredPeriodInfo
  actualPeriods: number
  scheduleState: string
  limitCount: number
  stdCount: number
  suggestScheduleWeeks: any[]
  suggestScheduleWeekInfo: string
  campusId: number
  roomTypeId: number
  adminclassIds: number[]
  remark: string
  scheduleRemark: string
  adminclasses: Adminclasses[]
  scheduleJsonParams: any[]
}

interface RequiredPeriodInfo {
  total: number
  weeks: number
  theory: string
  theoryUnit: string
  requireTheory: string
  practice: string
  practiceUnit: string
  requirePractice: string
  test: string
  testUnit: string
  requireTest: string
  experiment: string
  experimentUnit: string
  requireExperiment: string
  machine: string
  machineUnit: string
  requireMachine: string
  design: string
  designUnit: string
  requireDesign: string
  periodsPerWeek: number
}

interface Room {
  id: number
  nameZh: string
  nameEn: string
  code: string
  building: Building
  roomType: Campus
  floor: number
  virtual: boolean
  seatsForLesson: number
  remark: string
  seats: number
}

interface ScheduleGroupList {
  id: number
  lessonId: number
  no: number
  limitCount: number
  stdCount: number
  actualPeriods: number
  default: boolean
}

interface ScheduleList {
  lessonId: number
  scheduleGroupId: number
  periods: number
  date: string
  room: Room
  weekday: number
  startTime: number
  endTime: number
  teacherId: number
  personId: number
  personName: string
  experiment: string
  customPlace: string
  lessonType: string
  weekIndex: number
}

interface TeacherAssignmentList {
  role: string
  code: string
  teacherId: number
  personId: number
  name: string
  age: string
  titleName: string
}
