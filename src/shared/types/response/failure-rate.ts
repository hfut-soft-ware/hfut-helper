export interface IFailureRateResponse {
  code: number
  msg: string
  data: IFailureRateData[]
}

export interface IFailureRateData {
  semesterName: string
  failCount: number
  totalCount: number
  failRate: number
}
