export interface IScoreResponse {
  code: number
  msg: string
  data: IScore
}

export interface IScore {
  majorRankVO: MajorRankVo
  majorStatisticVO: MajorStatisticVo
  semesters: Semester[]
}

export interface MajorRankVo {
  scoreRank: number
  gpaRank: number
  total: number
  myAvgScore: number
  myAvgGpa: number
  majorAvgScore: number
  majorAvgGpa: number
  majorMaxScore: number
  majorMaxGpa: number
  majorHeadScore: number
  majorHeadGpa: number
}

export interface MajorStatisticVo {
  majorCompulsoryCredit: number
  majorElectiveCredit: number
  electiveCredit: number
  range95_100: number
  range90_95: number
  range80_90: number
  range70_80: number
  range60_70: number
  range0_60: number
}

export interface Semester {
  semester: string
  semesterId: number
  semesterStatisticVO: SemesterStatisticVo
  semesterRankVO: SemesterRankVo
  scores: Score[]
}

export interface SemesterStatisticVo {
  majorCompulsoryCredit: number
  majorElectiveCredit: number
  electiveCredit: number
  range95_100: number
  range90_95: number
  range80_90: number
  range70_80: number
  range60_70: number
  range0_60: number
}

export interface SemesterRankVo {
  scoreRank: number
  gpaRank: number
  total: number
  myAvgScore: number
  myAvgGpa: number
  majorAvgScore: number
  majorAvgGpa: number
  majorMaxScore: number
  majorMaxGpa: number
  majorHeadScore: number
  majorHeadGpa: number
}

export interface Score {
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
