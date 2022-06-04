export interface IFlowWaterResponse {
  code: number
  msg: string
  data: IFlowWaterData
}

export interface IFlowWaterData {
  list: List[]
  pageNum: number
  count: number
  grossAmount: string
  index: number
}

export interface List {
  time: string
  consumerType: string
  merchantName: string
  amount: string
  balance: string
  index: string
  status: string
  desc: string
}
