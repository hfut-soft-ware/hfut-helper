export interface QA {
  question: string
  answer: string
}

export interface HelpResponse {
  code: number
  msg: string
  data: QA[]
}
