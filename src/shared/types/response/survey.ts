export interface RadioQuestion {
  id: string
  question: string
  option: string[]
}

export interface BlankQuestion {
  id: string
  question: string
}

export interface SurveyData {
  surveyAssoc: number
  radioQuestions: RadioQuestion[]
  blankQuestion: BlankQuestion
}

export interface ISurveyResponse {
  code: number
  msg: string
  data: SurveyData
}
