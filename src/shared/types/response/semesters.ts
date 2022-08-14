export interface Semester {
  id: number
  startDate: string
  name: string
}

export interface ISemesters {
  code: number
  msg: string
  data: Semester[]
}
