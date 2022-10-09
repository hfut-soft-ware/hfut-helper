export interface Course {
  code: string
  name: string
  credit: string
}

export interface TokenTip {
  trainPlans: Course[]
  mine: Course[]
}

export interface ITokenTipsResponse {
  code: number
  msg: string
  data: TokenTip
}
