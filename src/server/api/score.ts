import { request } from '@/server/base'
import type { IScoreResponse } from '@/shared/types/response/score'
import type { ISingleScoreResponse, SingleScoreDto } from '@/shared/types/response/sing-score'
import type { ICustomScoreResponse } from '@/shared/types/response/score-custom'
import type { IFailureRateResponse } from '@/shared/types/response/failure-rate'

export function getScoreRequest(refresh = true) {
  return request<IScoreResponse>({
    url: '/score/v2/all',
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
