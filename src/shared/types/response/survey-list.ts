export interface SurveyTask {
  id: number
  teacherName: string
  submitted: boolean
}

export interface List {
  courseName: string
  timeRange: string
  surveyTasks: SurveyTask[]
}

export interface Data {
  list: List[]
  studentId: string
}

export interface ISurveyListResponse {
  code: number
  msg: string
  data: Data
}
