export interface SingleScoreDto {
  semesterId: number
  lessonId: string
}

export interface ISingleScoreResponse {
  code: number
  msg: string
  data: ISingleScoreData
}

export interface ISingleScoreData {
  majorRank: MajorRank
  classRank: ClassRank
}

export interface MajorRank {
  total: number
  score: Score
  gpa: Gpa
  details: Detail[]
}

export interface Score {
  rank: number
  avg: number
  max: number
  head: number
}

export interface Gpa {
  rank: number
  avg: number
  max: number
  head: number
}

export interface Detail {
  name: string
  rank: number
  mine: number
  avg: number
  max: number
  actualNum: number
}

export interface ClassRank {
  total: number
  score: Score2
  gpa: Gpa2
  details: Detail2[]
}

export interface Score2 {
  rank: number
  avg: number
  max: number
  head: number
}

export interface Gpa2 {
  rank: number
  avg: number
  max: number
  head: number
}

export interface Detail2 {
  name: string
  rank: number
  mine: number
  avg: number
  max: number
  actualNum: number
}
