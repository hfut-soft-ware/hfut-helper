import { request } from '@/server/base'
import type { ISingleScoreResponse, SingleScoreDto } from '@/shared/types/response/sing-score'
import type { ICustomScoreResponse } from '@/shared/types/response/score-custom'
import type { IFailureRateResponse } from '@/shared/types/response/failure-rate'
import type { IFailureRateSearchResponse } from '@/shared/types/response/failure-rate-search'
import type { IScoreResponseData } from '@/shared/types/response/score'
import type { ISingleScoreSchoolResponse } from '@/shared/types/response/single-score-school'
import type { ITokenTipsResponse } from '@/shared/types/response/token-tips'
import type { IExpressionDto } from '@/shared/types/dto/expression'
import type { IStatementsResponse } from '@/shared/types/response/statements'

export function getScoreRequest(refresh = true) {
  return request<IScoreResponseData>({
    url: '/score/v3/all',
    params: {
      refresh,
    },
  })
}

export function getSingleScoreRequest(singleScoreDto: SingleScoreDto) {
  return request<ISingleScoreResponse>({
    url: '/score/rank/single',
    params: {
      ...singleScoreDto,
    },
  })
}

export function getSingleScoreSchoolRequest(singleScoreDto: SingleScoreDto) {
  return request<ISingleScoreSchoolResponse>({
    url: '/score/rank/single/school',
    params: singleScoreDto,
  })
}

export function getCustomScoreRequest(courseIds: string[]) {
  return request<ICustomScoreResponse>({
    url: '/score/rank/diy',
    method: 'POST',
    data: {
      courseIds,
      useCourseName: false,
    },
  })
}

export function getFailureRateRequest(courseName: string) {
  return request<IFailureRateResponse>({
    url: '/score/failRate',
    params: {
      courseName,
    },
  })
}

export function getFailureRateSearchRequest(courseName: string) {
  return request<IFailureRateSearchResponse>({
    url: '/score/v2/failRate',
    params: {
      courseName,
    },
  })
}

export function getTokenTips() {
  return request<ITokenTipsResponse>({
    url: '/score/tokenTips',
  })
}

export function grammerCheck(data: IExpressionDto) {
  return request<{
    code: number
    msg: string
    data: string
  }>({
    url: '/score/check',
    method: 'POST',
    data,
  })
}

export function confirmGrammer(data: IExpressionDto) {
  return request<{
    code: number
    msg: string
    data: null
  }>({
    url: '/score/v2/confirm',
    method: 'POST',
    data,
  })
}

export function getStatements() {
  return request<IStatementsResponse>({
    url: '/score/statements',
  })
}
