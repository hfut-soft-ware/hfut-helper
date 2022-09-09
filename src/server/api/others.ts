import { request } from '@/server/base'
import type { BusQueryResponse } from '@/shared/types/response/bus-query'
import type { IEmptyClassroomResponse } from '@/shared/types/response/empty-classroom'
import type { IEmptyClassroomDto } from '@/shared/types/dto/empty-classroom'
import type { IClassmateAllResponse } from '@/shared/types/response/classmate-all'

export function getBusRequest() {
  return request<BusQueryResponse>({
    url: '/api/bus',
  })
}

export function getClassroomRequest(params: IEmptyClassroomDto) {
  return request<IEmptyClassroomResponse>({
    url: '/emptyClassroom/day',
    params,
  })
}

export function getClassmatesAll(courseId: number) {
  return request<IClassmateAllResponse>({
    url: '/classmate/all',
    params: {
      courseId,
    },
  })
}
