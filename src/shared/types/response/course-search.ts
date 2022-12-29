export interface ICourseSearchResponse {
  code: number
  msg: string
  data: Data
}

export interface Data {
  list: CourseInfo[]
  page: PageInfo
}

export interface CourseInfo {
  courseName: string
  courseCode: string
  courseType: string
  credits: number
  className: string
  classCode: string
  openDepart: string
  examMod: string
  campus: string
  teachers: string[]
  schedule: string[]
}

export interface PageInfo {
  currentPage: number
  rowsInPage: number
  rowsPerPage: number
  totalRows: number
  totalPages: number
}
