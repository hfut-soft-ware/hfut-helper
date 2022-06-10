export interface IAddCourseDto {
  id?: string
  name: string
  mark: string
  color: string
  schedule: Partial<Schedule>
}

interface Schedule {
  room: string
  weekDay: number
  startTime: string
  endTime: string
  weeks: number[]
}
