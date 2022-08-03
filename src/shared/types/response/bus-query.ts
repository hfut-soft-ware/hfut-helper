export interface BusInfo {
  runRange: string[]
  startTime: string
  startPlace: string
  passPlace: string
  count: string
}

export interface BusQueryData {
  weekday: BusInfo[]
  sat: BusInfo[]
  sun: BusInfo[]
}

export interface BusQueryResponse {
  code: number
  msg: string
  data: BusQueryData
}
