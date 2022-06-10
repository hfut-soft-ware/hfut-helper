import { computed, reactive, ref } from 'vue'

export type TEmptyCoursePos = { x: number; y: number }

export function useCustomCourseShow() {
  const currentEmptyCourse = reactive<TEmptyCoursePos>({ x: -1, y: -1 })
  const customCourseShow = ref(false)
  const startIndex = computed(() => currentEmptyCourse.y + 1)
  const currentDay = computed(() => currentEmptyCourse.x + 1)
  const isCustom = ref(false)
  // 给course-popup
  const weekday = ref(1)

  const onCustomCourseClose = () => {
    customCourseShow.value = false
  }

  const handleCustomCourseCardClick = (pos: TEmptyCoursePos) => {
    currentEmptyCourse.x = pos.x
    currentEmptyCourse.y = pos.y
  }

  const handleOpenCustomCourse = () => {
    customCourseShow.value = true
  }

  return {
    customCourseShow,
    currentEmptyCourse,
    startIndex,
    currentDay,
    isCustom,
    weekday,
    onCustomCourseClose,
    handleCustomCourseCardClick,
    handleOpenCustomCourse,
  }
}
