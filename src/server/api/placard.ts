import { request } from '@/server/base'
import type { PlacardResponse } from '@/shared/types/response/placard'

export function getPlacard() {
  return request<PlacardResponse>({
    url: '/api/placard',
  })
}
