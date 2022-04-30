import { CourseLayout } from '@/_mock_/layout'
import { courseList } from '@/_mock_/auth'

export function getCourseListRequest() {
  // return request({
  //   url: '/eam/coursesList',
  // })
  return new Promise((resolve) => {
    resolve(courseList)
  })
}

export function getCourseListLayoutRequest() {
  return new Promise((resolve) => {
    resolve(CourseLayout)
  })
}
