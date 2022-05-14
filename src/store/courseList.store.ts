import { defineStore } from 'pinia'
import type { ICourse, ILesson, IMainInfo, ISchedule } from '@/shared/types/response/course'
import { getCourseListRequest } from '@/server/api/user'
import { isNullOrUndefined } from '@/shared/utils/'

type VisibleSchedule = Partial<{
  weekIdx: number
  dayIdx: number
}>

type GetDateProp = {
  week: number
  day: number
  startTime: string
}

type ScheduleVisibleWeek = {
  week: { date: Date[]; active: boolean }[]
  course: ISchedule[][]
}

type ScheduleName = 'weekSchedule' | 'daySchedule'

type State = {
  list: ICourse
  currentWeekIdx: number
  daySchedule: VisibleSchedule
  weekSchedule: VisibleSchedule
  alreadyLoaded: boolean
}

type Getters = {
  course: (state: State) => ICourse
  mainInfo: (state: State) => IMainInfo
  currentWeekCourse: (state: State) => ISchedule[][]
  todayCourse: (state: State) => ISchedule[]
  dayScheduleVisibleWeek: (state: State) => ScheduleVisibleWeek
  weekScheduleVisibleWeek: (state: State) => ScheduleVisibleWeek
}

export type GetCourseByHourIndexReturn = { course?: ISchedule; detail?: ILesson }

type Actions = {
  getCourseList: () => Promise<ICourse>
  setDaySchedule: (daySchedule: VisibleSchedule) => void
  setWeekSchedule: (weekSchedule: VisibleSchedule) => void
  getCourseDetailByIdx: (idx?: number) => ILesson | undefined
  getCourseByHourIndex: (hourIndex: number) => GetCourseByHourIndexReturn
}

function createSetSchedule(name: ScheduleName, _this: State) {
  return function(payload: VisibleSchedule) {
    if (isNullOrUndefined(payload.dayIdx)) {
      payload.dayIdx = _this[name].dayIdx
    }
    if (isNullOrUndefined(payload.weekIdx)) {
      payload.weekIdx = _this[name].weekIdx
    }

    _this[name] = payload
  }
}

function createScheduleVisibleWeek(name: ScheduleName) {
  return function(state: State) {
    const weekIdx = state[name].weekIdx!
    const startTime = state.list.mainInfo.semesterStartDate

    return {
      week: Array.from(
        { length: 7 },
        (_, i) => ({
          date: getCourseDate(
            { week: weekIdx, day: i, startTime }),
          active: state[name].dayIdx === i,
        }),
      ),
      course: state.list.schedule[weekIdx],
    } as unknown as ScheduleVisibleWeek
  }
}

export const useCourseListStore = defineStore<'courseList', State, Getters, Actions>('courseList', {
  state: () => ({
    list: {
      lessons: [],
      mainInfo: {
        weekCount: 20,
        curWeek: 1,
        curDayIndex: 1,
        semesterStartDate: '',
      },
      mooc: [],
      schedule: [],
    },
    currentWeekIdx: 0,
    daySchedule: {
      weekIdx: 0,
      dayIdx: 0,
    },
    weekSchedule: {
      weekIdx: 0,
      dayIdx: 0,
    },
    alreadyLoaded: false,
  }),

  getters: {
    course: (state: State) => state.list,
    mainInfo: (state: State) => state.list.mainInfo,
    currentWeekCourse(state: State) {
      return this.course.schedule[state.currentWeekIdx]
    },
    todayCourse(state: State) {
      return this.course.schedule[state.daySchedule.weekIdx!][state.daySchedule.dayIdx!]
    },
    dayScheduleVisibleWeek: createScheduleVisibleWeek('daySchedule'),
    weekScheduleVisibleWeek: createScheduleVisibleWeek('weekSchedule'),
  },

  actions: {
    async getCourseList(forceRefresh = false) {
      const fetchData = async() => {
        await getCourseListRequest().then((res) => {
          const data = res.data.data
          this.list = data

          this.currentWeekIdx = data.mainInfo.curWeek - 1
          const scheduleIdx = {
            weekIdx: this.currentWeekIdx,
            dayIdx: data.mainInfo.curDayIndex - 1,
          }
          this.daySchedule = scheduleIdx
          this.weekSchedule = scheduleIdx

          this.alreadyLoaded = true
        }).catch((err) => {
          throw new Error(err)
        })
      }

      if (!this.alreadyLoaded) {
        await fetchData()
      } else if (forceRefresh) {
        await fetchData()
      }

      return this.list
    },
    setDaySchedule(payload) {
      createSetSchedule('daySchedule', this)(payload)
    },
    setWeekSchedule(payload) {
      createSetSchedule('weekSchedule', this)(payload)
    },
    getCourseDetailByIdx(idx?: number) {
      if (!idx) {
        return
      }

      return this.course.lessons[idx]
    },
    getCourseByHourIndex(index: number) {
      const course = this.todayCourse.find(course => course.index === index)

      return {
        course,
        detail: this.getCourseDetailByIdx(course?.lessonIndex),
      }
    },

  },
})

export function getCourseDate(date: GetDateProp) {
  const startTime = new Date(date.startTime)

  return new Date(startTime.getTime() + date.week * 7 * 24 * 60 * 60 * 1000 + (date.day + 1) * 24 * 60 * 60 * 1000)
}

export function getTeachers(teachers: string[]) {
  return teachers.join('/')
}
