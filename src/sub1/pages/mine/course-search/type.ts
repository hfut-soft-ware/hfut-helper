import type { CourseInfo } from '@/shared/types/response/course-search'

export interface CourseItem extends CourseInfo {
  id: number
}
