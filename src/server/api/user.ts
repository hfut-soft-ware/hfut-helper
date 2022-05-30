import { request } from '../base'
import type { ICourseResponse } from '../../shared/types/response/course'
import { CourseLayout } from '@/_mock_/layout'

export function getCourseListRequest() {
  return request<ICourseResponse>({
    url: 'course/all',
  })
}

export function getCourseListLayoutRequest() {
  return new Promise((resolve) => {
    resolve(CourseLayout)
  })
}
