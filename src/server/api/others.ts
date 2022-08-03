import { request } from '@/server/base'
import type { BusQueryResponse } from '@/shared/types/response/bus-query'

export function getBusRequest() {
  return request<BusQueryResponse>({
    url: '/api/bus',
  })
}
