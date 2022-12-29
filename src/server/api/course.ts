import { request } from '@/server/base'
import type { ICourseSearchResponse } from '@/shared/types/response/course-search'
import type { CourseSearchDto } from '@/shared/types/dto/course-search'

export function courseSearch(query: CourseSearchDto) {
  return request<ICourseSearchResponse>({
    url: '/course/search/course',
    query,
  })
}
