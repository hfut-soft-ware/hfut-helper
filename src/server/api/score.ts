import { request } from '@/server/base'
import type { IScoreResponse } from '@/shared/types/response/score'
import type { ISingleScoreResponse, SingleScoreDto } from '@/shared/types/response/sing-score'

export function getScoreRequest() {
  return request<IScoreResponse>({
    url: '/score/all',
    params: {
      refresh: true,
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
