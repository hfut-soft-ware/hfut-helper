import { storeToRefs } from 'pinia'
import type { TCourseListStore } from '@/store/courseList.store'

export function useSelectCourseList(store: TCourseListStore, type: 'week' | 'day' = 'day') {
  const setAction = type === 'day' ? store.setDaySchedule : store.setWeekSchedule
  const dateSchedule = type === 'day' ? storeToRefs(store).daySchedule : storeToRefs(store).weekSchedule

  const prevBoundary = type === 'day' ? 0 : 1
  const nextBoundary = type === 'day' ? 19 : 20

  const onPrev = () => {
    if (dateSchedule.value.weekIdx === prevBoundary) {
      setAction({ weekIdx: nextBoundary })
    } else {
      setAction({ weekIdx: dateSchedule.value.weekIdx! - 1 })
    }
  }

  const onNext = () => {
    if (dateSchedule.value.weekIdx === nextBoundary) {
      setAction({ weekIdx: prevBoundary })
    } else {
      setAction({ weekIdx: dateSchedule.value.weekIdx! + 1 })
    }
  }

  return {
    onPrev,
    onNext,
  }
}
