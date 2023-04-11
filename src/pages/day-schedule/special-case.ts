import type { GetCourseByHourIndexReturn } from '@/store/courseList.store'

type CourseListTemp ={
  time: {
    start: string
    index: any
  }
  course: GetCourseByHourIndexReturn[]
}

/**
 *
 * @description 处理 18:30 考试的情况，将考试从 19:00 的位置移动到 18:00
 */
export const handleSpecialExamSchedule = (courseListTemp: CourseListTemp[]) => {
  const specialCase = courseListTemp[6]
  let specialCaseExamIndex = 0
  if (specialCase.course.length && specialCase.course.some((item, index) => {
    const res = item.course?.startTime === '18:30'
    specialCaseExamIndex = res ? index : 0
    return res
  })) {
    courseListTemp[5].course.push(specialCase.course[specialCaseExamIndex])
    specialCase.course.splice(specialCaseExamIndex, 1)
  }
  return courseListTemp
}
