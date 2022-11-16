import { request } from '@/server/base'
import type { ISurveyListResponse } from '@/shared/types/response/survey-list'
import type { ISurveyResponse } from '@/shared/types/response/survey'
import type { SubmitSurveyDto } from '@/shared/types/dto/survey'

export function getSurveyList() {
  return request<ISurveyListResponse>({
    url: '/survey/getList',
  })
}

export function getSurvey(taskId: string) {
  return request<ISurveyResponse>({
    url: '/survey/getSurvey',
    params: {
      taskId,
    },
  })
}

export function submitSurvey(data: SubmitSurveyDto) {
  return request<{
    content: string
  }>({
    url: '/survey/submit',
    method: 'POST',
    data,
  })
}
