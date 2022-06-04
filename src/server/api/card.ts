import { format } from 'date-fns'
import type { FlowWaterDto } from '@/shared/types/dto/card'
import { request } from '@/server/base'
import type { IFlowWaterResponse } from '@/shared/types/response/flowWater'

export function getFlowWater(flowWaterDto: FlowWaterDto, pageNum = 1) {
  return request<IFlowWaterResponse>({
    url: '/user/card/flowWater',
    query: {
      startDate: format(flowWaterDto.startDate, 'yyyy-MM-dd'),
      endDate: format(flowWaterDto.endDate, 'yyyy-MM-dd'),
      pageNum,
    },
  })
}
