export interface IScoreResponseData {
  code: number
  msg: string
  data: IScoreData
}

export interface IScoreData {
  compulsoryRank: ICompulsoryRank
  totalRank: TotalRank
  semesters: Semester[]
  calculateLogs: CalculateLogs[]
}

export interface CalculateLogs {
  semesterName: string
  scoreDetails: string[]
}

export interface ICompulsoryRank {
  score: Score
  gpa: Gpa
  total: number
}

export interface Score {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Gpa {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface TotalRank {
  score: Score2
  gpa: Gpa2
  total: number
}

export interface Score2 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Gpa2 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Semester {
  semester: string
  semesterId: number
  compulsoryRank: CompulsoryRank2
  totalRank: TotalRank2
  scores: Score5[]
}

export interface CompulsoryRank2 {
  score: Score3
  gpa: Gpa3
  total: number
}

export interface Score3 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Gpa3 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface TotalRank2 {
  score: Score4
  gpa: Gpa4
  total: number
}

export interface Score4 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Gpa4 {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
}

export interface Score5 {
  name: string
  lessonId: string
  teachingClassId: string
  credit: string
  gpa: string
  score: string
  details: Detail[]
}

export interface Detail {
  type: string
  score: string
}
