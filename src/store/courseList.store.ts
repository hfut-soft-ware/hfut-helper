import { defineStore, storeToRefs } from 'pinia'
import { addDays, isToday } from 'date-fns'
import type { ICourse, IExam, ILesson, IMainInfo, IMooc, ISchedule } from '@/shared/types/response/course'
import { getCourseListRequest } from '@/server/api/user'
import { isNullOrUndefined, isObject } from '@/shared/utils/'
import { CARD_COLORS, COURSE_KEY } from '@/shared/constant'
import { ellipsisString } from '@/shared/utils/ellipsisString'
import { getLoverCourse, setLoverCourse, uesLoverStore } from '@/store/lover.store'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'

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

export type TExam = {
  detail: IExam
  isExpired: boolean
  isToday: boolean
  startDate: Date
  endDate: Date
}[]

type Getters = {
  course: (state: State) => ICourse
  mainInfo: (state: State) => IMainInfo
  currentWeekCourse: (state: State) => ISchedule[][]
  todayCourse: (state: State) => ISchedule[]
  dayScheduleVisibleWeek: (state: State) => ScheduleVisibleWeek
  weekScheduleVisibleWeek: (state: State) => ScheduleVisibleWeek
  exam: () => TExam
  recentExam: () => TExam
  courseList: (state: State) => (ILesson & { isFinished: boolean })[]
}

export type GetCourseByHourIndexReturn = { course?: ISchedule; detail?: ILesson }

export type CourseData = GetCourseByHourIndexReturn

type Actions = {
  getCourseList: (forceRefresh?: boolean, isAvoidRefreshingSchedule?: boolean) => Promise<ICourse>
  setDaySchedule: (daySchedule: VisibleSchedule) => void
  setWeekSchedule: (weekSchedule: VisibleSchedule) => void
  getCourseDetailByIdx: (idx?: number) => ILesson | undefined
  getCourseByHourIndex: (hourIndex: number) => CourseData
  initStore: (data: ICourse, payload?: { week: number; day: number }) => void
  initCachedStore: () => void
  changeStatus: (isLover: boolean) => void
  addCourse: (payload: TCustomCourse) => void
  initSearchStore: (data: ICourse) => void
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
    const startTime = state.list?.mainInfo?.semesterStartDate || getWeekCourse().mainInfo.semesterStartDate

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

export type TCourseListStore = ReturnType<typeof useCourseListStore>

// TODO room类型问题
export function formatRoom(room: string) {
  if (room === 'null') {
    return '暂未安排教室'
  } else {
    return ellipsisString(room, 12)
  }
}

// 课程长度最长为十个长度
export function formatCourseName(courseName: string) {
  return ellipsisString(courseName, 10)
}

export const setWeekCourse = (data: ICourse) => uni.setStorageSync(COURSE_KEY, data)

export const getWeekCourse = () => uni.getStorageSync(COURSE_KEY) as ICourse

const CUSTOM_COURSE_KEY = '__CUSTOM_COURSE_KEY__'

export type TCustomCourse = { weekIdx: number[]; dayIdx: number; name: string; room: string; startTime: string; endTime: string; color: string }

export const [getCustomCourse, setCustomCourse] = useSyncStorage<ICourse>(CUSTOM_COURSE_KEY)

// TODO 用setupStore重构
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
      exams: [],
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
    courseList: (state: State) => [...state.list.lessons, ...state.list.mooc].filter(item => item.id !== null).map((item) => {
      if ((item as IMooc)?.detail) {
        (item as any).detailInfo = {
          ...(item as IMooc).detail,
        }
        ;(item as any).courseName = (item as IMooc).name
      }
      return {
        ...item,
        isFinished: parseInt((/^[0-9][0-9]?~([0-9][0-9]?)周$/.exec(((item as any).detailInfo || (item as any).detail).weeks) || [])[1] || '20') < state.currentWeekIdx + 1,
      } as ILesson & { isFinished: boolean }
    }),
    exam() {
      const exams = this.list.exams
      return exams.map((item) => {
        const date = item.date.replace(/-/g, '/')
        const startDate = new Date(`${date} ${item.startTime}`)
        const endDate = new Date(`${date} ${item.endTime}`)
        const currentDate = new Date()
        const isExpired = currentDate > endDate
        const isTodayExam = isToday(endDate)

        return {
          isExpired,
          startDate,
          isToday: isTodayExam,
          endDate,
          detail: item,
        }
      }).sort((prev, cur) => (prev.startDate as any) - (cur.startDate as any)) as TExam
    },
    recentExam() {
      return this.exam.filter(item => !item.isExpired)
    },
    dayScheduleVisibleWeek: createScheduleVisibleWeek('daySchedule'),
    weekScheduleVisibleWeek: createScheduleVisibleWeek('weekSchedule'),
  },

  actions: {
    async getCourseList(forceRefresh = false, isAvoidRefreshingScheduleDate = false) {
      const { weekIdx: currentWeek, dayIdx: currentDay } = this.weekSchedule
      const { isLover: lover } = storeToRefs(uesLoverStore())
      const isLover = lover.value

      const cachedCourseList = getWeekCourse()
      if (isObject(cachedCourseList)) {
        this.initStore(cachedCourseList)
      }

      const initStore = (data: ICourse) => {
        // 判断是否刷新后要回到本周来
        if (isAvoidRefreshingScheduleDate) {
          this.initStore(data, { week: currentWeek || 0, day: currentDay || 0 })
        } else {
          this.initStore(data)
        }
      }

      const fetchData = async() => {
        await getCourseListRequest(isLover, forceRefresh).then((res) => {
          const data = res.data.data
          // 缓存课程信息
          if (isLover) {
            setLoverCourse(data)
          } else {
            setWeekCourse(data)
          }

          initStore(data)
        }).catch((err) => {
          const data = uni.getStorageSync(COURSE_KEY) as ICourse
          initStore(data)

          throw new Error(err)
        })
      }

      if (!this.alreadyLoaded) {
        forceRefresh = true
        await fetchData()
      } else if (forceRefresh) {
        await fetchData()
      } else if (!forceRefresh && this.alreadyLoaded) {
        // 如果本地有缓存，则第一时间重置本地课表（保证时间正确性）
        this.initCachedStore()
        forceRefresh = true
        // 后台静默请求
        fetchData()
      }

      return this.list
    },
    initStore(data: ICourse, payload?: { week: number; day: number }) {
      this.list = data

      this.currentWeekIdx = data.mainInfo.curWeek - 1
      const scheduleIdx = {
        weekIdx: payload?.week || this.currentWeekIdx,
        dayIdx: payload?.day || new Date().getDay() - 1,
      }
      this.daySchedule = scheduleIdx
      this.weekSchedule = scheduleIdx

      this.alreadyLoaded = true
    },
    initCachedStore() {
      this.initStore(getWeekCourse())
    },
    initSearchStore(data: ICourse) {
      this.list = data
      this.weekSchedule = {
        weekIdx: 0,
        dayIdx: 0,
      }
    },
    changeStatus(isLover: boolean) {
      if (isLover) {
        this.initStore(getLoverCourse())
      } else {
        this.initStore(getWeekCourse())
      }
    },
    addCourse(payload: TCustomCourse) {
      setCustomCourse(payload)
      const { weekIdx, dayIdx } = payload
      weekIdx.forEach((idx) => {
        // TODO 解决类型
        this.list.schedule[idx][dayIdx].push({
          ...(payload as any),
        })
      })
    },
    setDaySchedule(payload) {
      createSetSchedule('daySchedule', this)(payload)
    },
    setWeekSchedule(payload) {
      createSetSchedule('weekSchedule', this)(payload)
    },
    getCourseDetailByIdx(idx?: number) {
      // TODO 莫名其妙的bug
      idx = idx || 0

      const detail = this.course.lessons[idx]
      const detailColor = detail.detailInfo.color || ''
      const color = detailColor.length > 0 ? detailColor : CARD_COLORS[idx % (CARD_COLORS.length - 1)]

      return { ...detail, color }
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
  const startTime = addDays(new Date(date.startTime), -1)

  return new Date(startTime.getTime() + date.week * 7 * 24 * 60 * 60 * 1000 + (date.day + 1) * 24 * 60 * 60 * 1000)
}

export function getTeachers(teachers: string[]) {
  return teachers.join('/')
}

export function getStorageCourse() {
  return uni.getStorageSync(COURSE_KEY) as ICourse
}
