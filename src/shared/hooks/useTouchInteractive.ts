import { reactive } from 'vue'
import type { TCourseListStore } from '@/store/courseList.store'
import { useSelectCourseList } from '@/shared/hooks/use-selectCourseList'

export function useTouchInteractive(store: TCourseListStore, type: 'day' | 'week' = 'day') {
  const pos = reactive({
    initialX: 0,
    endX: -1,
  })

  const { onPrev, onNext } = useSelectCourseList(store, type)

  function onTouchStart(e: TouchEvent) {
    pos.initialX = e.touches[0].pageX
  }

  const interactiveBoundary = 70

  // 判断是否是左右滑动
  function onTouchEnd(e: TouchEvent) {
    pos.endX = e.changedTouches[0].clientX
    if (Math.abs(pos.initialX - pos.endX) < interactiveBoundary) {
      return
    }

    if (pos.initialX - pos.endX > interactiveBoundary) {
      onNext()
    } else if (pos.endX - pos.initialX > interactiveBoundary) {
      onPrev()
    }
  }

  return {
    onTouchStart,

    onTouchEnd,
    onPrev,
    onNext,
  }
}
