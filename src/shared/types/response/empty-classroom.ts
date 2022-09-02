export interface Lesson {
  startTime: string
  endTime: string
  courseId: number
}

export interface Datum {
  towerName: string
  roomId: number
  values: Lesson[]
}

export interface IEmptyClassroomResponse {
  code: number
  msg: string
  data: Datum[]
}
