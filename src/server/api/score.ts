import { request } from '@/server/base'
import type { ISingleScoreResponse, SingleScoreDto } from '@/shared/types/response/sing-score'
import type { ICustomScoreResponse } from '@/shared/types/response/score-custom'
import type { IFailureRateResponse } from '@/shared/types/response/failure-rate'
import type { IFailureRateSearchResponse } from '@/shared/types/response/failure-rate-search'
import type { IScoreResponseData } from '@/shared/types/response/score'

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

export function getCustomScoreRequest(courseNames: string[]) {
  return request<ICustomScoreResponse>({
    url: '/score/rank/diy',
    method: 'POST',
    data: {
      courseNames,
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
