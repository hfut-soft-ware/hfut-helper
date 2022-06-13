export interface IAllCourseOptionsResponse {
  code: number
  msg: string
  data: IAllCourseOptionsData
}

export interface IAllCourseOptionsData {
  semesters: Semester[]
  campuses: Campuse[]
}

export interface Semester {
  semesterId: number
  semesterName: string
}

interface Campuse {
  campus: string
  colleges: College[]
}

interface College {
  college: string
  majors: Major[]
}

interface Major {
  major: string
  grades: Grade[]
}

interface Grade {
  grade: number
  adminClass: string[]
}
