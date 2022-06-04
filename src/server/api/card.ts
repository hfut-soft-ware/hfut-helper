import { format } from 'date-fns'
import type { FlowWaterDto } from '@/shared/types/dto/card'
import { request } from '@/server/base'
import type { IFlowWaterResponse } from '@/shared/types/response/flowWater'

export function getFlowWater(flowWaterDto: FlowWaterDto) {
  return request<IFlowWaterResponse>({
    url: '/user/card/flowWater',
    query: {
      startDate: format(Date.now() - 1000 * 60 * 60 * 24 * 7, 'yyyy-MM-dd'),
      endDate: format(Date.now(), 'yyyy-MM-dd'),
      pageNum: 1,
    },
  })
}
