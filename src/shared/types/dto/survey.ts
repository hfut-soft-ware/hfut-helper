export interface SubmitSurveyDto {
  studentId: string
  surveyAssoc: number
  lessonSurveyTaskAssoc: number
  radioQuestionAnswers: RadioQuestionAnswer[]
  blankQuestionAnswers: BlankQuestionAnswer[]
}

export interface RadioQuestionAnswer {
  questionId: string
  optionName: string
}

export interface BlankQuestionAnswer {
  questionId: string
  content: string
}
