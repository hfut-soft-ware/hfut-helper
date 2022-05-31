import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { TCourseListStore } from '@/store/courseList.store'
import { useSelectCourseList } from '@/shared/hooks/use-selectCourseList'

export function useTouchInteractive(store: TCourseListStore, type: 'day' | 'week' = 'day') {
  const pos = reactive({
    initialX: 0,
    endX: 0,
  })

  const { onPrev, onNext } = useSelectCourseList(store, type)

  function onTouchStart(e: TouchEvent) {
    pos.initialX = e.touches[0].pageX
  }

  function onTouchMove(e: TouchEvent) {
    pos.endX = e.touches[0].pageX
  }

  // 判断是否是左右滑动
  function onTouchEnd() {
    if (pos.initialX - pos.endX > 50) {
      onNext()
    } else if (pos.endX - pos.initialX > 50) {
      onPrev()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onPrev,
    onNext,
  }
}
