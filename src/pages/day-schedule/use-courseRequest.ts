import { useAsyncState } from '@vueuse/core'
import { useCourseListStore } from '@/store/courseList.store'
import type { ICourse } from '@/shared/types/response/course'

export function useCourseRequest() {
  const store = useCourseListStore()

  const { state, error, isLoading } = useAsyncState<ICourse>(store.getCourseList, {} as any)

  return {
    state,
    error,
    isLoading,
  }
}
