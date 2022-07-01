export interface IFailureRateResponse {
  code: number
  msg: string
  data: IFailureRateData[]
}

export interface IFailureRateData {
  avgScore: number
  semesterName: string
  failCount: number
  totalCount: number
  failRate: number
}
