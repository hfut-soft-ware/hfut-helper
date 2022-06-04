import { request } from '../base'
import type { ICourseResponse } from '@/shared/types/response/course'
import { CourseLayout } from '@/_mock_/layout'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { getLoverToken } from '@/store/lover.store'
import type { ICardBaseInfo } from '@/shared/types/response/card'

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
  return request<ICardBaseInfo>({
    url: 'user/card/base',
  })
}
