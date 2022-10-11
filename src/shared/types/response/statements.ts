export interface StatementInfo {
  studentId: number
  enable: boolean
  statements: string[]
}

export interface IStatementsResponse {
  code: number
  msg: string
  data: StatementInfo
}
