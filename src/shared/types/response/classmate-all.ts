export interface Classmate {
  id: number
  adminClass: string
  campus: string
  department: string
  grade: number
  major: string
  name: string
  sex: string
}

export interface IClassmateAllResponse {
  code: number
  msg: string
  data: Classmate[]
}
