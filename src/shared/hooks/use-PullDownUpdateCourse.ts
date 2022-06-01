import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'

export function usePullDownUpdateCourse() {
  onPullDownRefresh(() => {
    useCourseRequest(true)
  })
}
