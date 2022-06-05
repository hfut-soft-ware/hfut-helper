import { request } from '@/server/base'
import type { IScoreResponse } from '@/shared/types/response/score'

export function getScoreRequest() {
  return request<IScoreResponse>({
    url: '/score/all',
    params: {
      refresh: true,
    },
  })
}
