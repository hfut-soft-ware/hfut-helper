import { request } from '../base'
import type { ICourseResponse } from '@/shared/types/response/course'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { getLoverToken } from '@/store/lover.store'
import type { ICardBaseInfoResponse } from '@/shared/types/response/card'
import type { IAddCourseDto } from '@/shared/types/dto/course'
import type { IAllCourseOptionsResponse } from '@/shared/types/response/all-course-options'
import type { IGetAllCourseDto } from '@/shared/types/dto/getAllCourse'
import type { ITrainPlanResponse } from '@/shared/types/response/train-plan'
import type { ISemesters } from '@/shared/types/response/semesters'

export function getCourseListRequest(isLover = false, refresh = false, semesterId?: number) {
  const header = isLover ? { authorization: `Bearer ${getLoverToken()}` } : {}
  const params = semesterId
    ? {
        refresh,
        semesterId,
      }
    : {
        refresh,
      }
  return request<ICourseResponse>({
    url: 'course/all',
    header,
    params,
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

export function getAllCourseOptionsRequest() {
  return request<IAllCourseOptionsResponse>({
    url: '/course/school/option',
  })
}

export function getAllCourseQueryRequest(data: IGetAllCourseDto) {
  return request<ICourseResponse>({
    url: '/course/school/query',
    method: 'POST',
    data,
  })
}

export function getTrainPlanRequest() {
  return request<ITrainPlanResponse>({
    url: '/user/trainPlan',
  })
}

export function getSemesters() {
  return request<ISemesters>({
    url: '/api/semesters',
  })
}
