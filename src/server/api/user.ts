import { request } from '../base'
import type { ICourseResponse } from '@/shared/types/response/course'
import { CourseLayout } from '@/_mock_/layout'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { getLoverToken } from '@/store/lover.store'
import type { ICardBaseInfoResponse } from '@/shared/types/response/card'
import type { IAddCourseDto } from '@/shared/types/dto/course'

export function getCourseListRequest(isLover = false) {
  const header = isLover ? { authorization: `Bearer ${getLoverToken()}` } : {}

  return request<ICourseResponse>({
    url: 'course/all',
    header,

  })
}

export function getCourseListLayoutRequest() {
  return new Promise((resolve) => {
    resolve(CourseLayout)
  })
}

export function getUserInfo() {
  return request<IUserInfo>({
    url: 'user/info',
  })
}

export function getUserCardBaseInfo() {
  return request<ICardBaseInfoResponse>({
    url: 'user/card/base',
  })
}

export function addCourseRequest(data: IAddCourseDto) {
  return request<any>({
    url: 'course/diy/add',
    method: 'POST',
    data,
  })
}

export function updateCourseRequest(data: IAddCourseDto) {
  return request<any>({
    url: 'course/diy/update',
    method: 'POST',
    data,
  })
}

export function deleteCourseRequest(diyId: string) {
  return request<any>({
    url: 'course/diy/delete',
    params: {
      diyId,
    },
  })
}
