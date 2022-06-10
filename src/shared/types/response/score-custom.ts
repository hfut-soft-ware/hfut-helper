export interface ICustomScoreResponse {
  code: number
  msg: string
  data: ICustomScoreData
}

export interface ICustomScoreData {
  score: ICustomScore
  gpa: ICustomGpa
  total: number
}

export interface ICustomScore {
  mine: number
  rank: number
  max: number
  avg: number
  head: number
}

export interface ICustomGpa {
  mine: number
  rank: number
  max: number
  avg: number
  head: number
}
