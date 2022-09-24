export interface Score {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

export interface Gpa {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

export interface Detail {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
  name: string
}

export interface ISingleScoreSchoolData {
  total: number
  score: Score
  gpa: Gpa
  details: Detail[]
}

export interface ISingleScoreSchoolResponse {
  code: number
  msg: string
  data: ISingleScoreSchoolData
}
