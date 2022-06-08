import { reactive, ref } from 'vue'

export type TEmptyCoursePos = { x: number; y: number }

export function useCustomCourse() {
  const currentEmptyCourse = reactive<TEmptyCoursePos>({ x: -1, y: -1 })
  const customCourseShow = ref(false)
  const startIndex = ref()

  const onCustomCourseClose = () => {
    customCourseShow.value = false
  }

  const handleCustomCourseCardClick = (pos: TEmptyCoursePos) => {
    currentEmptyCourse.x = pos.x
    currentEmptyCourse.y = pos.y
    customCourseShow.value = true
  }

  const handleOpenCustomCourse = () => {
    customCourseShow.value = true
  }

  return {
    customCourseShow,
    currentEmptyCourse,
    startIndex,
    onCustomCourseClose,
    handleCustomCourseCardClick,
    handleOpenCustomCourse,
  }
}
