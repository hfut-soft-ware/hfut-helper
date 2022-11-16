export interface SurveyTask {
  id: number
  teacherName: string
  submitted: boolean
}

export interface List {
  courseName: string
  endTime: string
  surveyTasks: SurveyTask[]
}

export interface Data {
  list: List[]
}

export interface ISurveyListResponse {
  code: number
  msg: string
  data: Data
}
