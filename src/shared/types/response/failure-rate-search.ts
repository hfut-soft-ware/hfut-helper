export interface IFailureRateSearchResponse {
  code: number
  msg: string
  data: IFailureRateSearchData
}

export interface IFailureRateSearchData {
  options: string[]
  failRateVOS: any[]
}
