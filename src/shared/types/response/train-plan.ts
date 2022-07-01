export interface ITrainPlanResponse {
  code: number
  msg: string
  data: ITrainPlanData
}

export interface ITrainPlanData {
  name: string
  credit: string
  requiredCredit: string
  planTypes: PlanType[]
}

interface PlanType {
  name: string
  credit: string
  requiredCredit: string
  courseCount: number
  planCourses: PlanCourse[]
  progress?: number
}

interface PlanCourse {
  code: string
  name: string
  credits: string
  terms: string[]
  status: string
}
