export interface ICourseResponse {
  code: number
  msg: string
  data: ICourse
}

export interface ICourse {
  mainInfo: IMainInfo
  lessons: ILesson[]
  mooc: IMooc[]
  schedule: ISchedule[][][]
}

export interface IMooc {
  id: number
  name: string
  detail: ILessonDetail
}

export interface ILessonDetail {
  adminClass: string
  studentCount: number
  credits: string
  courseType: string
  code: string
  weeks: string
  examMode: string
  teachers: string[]
}

export interface IMainInfo {
  weekCount: number
  curWeek: number
  curDayIndex: number
  semesterStartDate: string
}

export interface ILesson {
  id: number
  courseName: string
  detailInfo: DetailInfo
  type: 'Lesson' | 'Exam'
}

export interface DetailInfo {
  adminClass: string
  studentCount: number
  credits: string
  courseTypeName: string
  code: string
  weeks: string
  examMode: string
  teachers: string[]
}

export interface ISchedule {
  startTime: string
  endTime: string
  index: number
  period: number
  wholePoint: boolean
  room: string
  lessonStartIndex: number
  lessonIndex: number
}
