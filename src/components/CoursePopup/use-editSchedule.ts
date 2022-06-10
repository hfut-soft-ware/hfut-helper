import { ref } from 'vue'
import type { CourseData } from '@/store/courseList.store'

export function useEditSchedule(data: CourseData) {
  const editShow = ref(false)

  function onEditScheduleClick() {
    editShow.value = true
  }

  function onScheduleClose() {
    editShow.value = false
  }

  function onEditUpdated() {
    editShow.value = false
  }

  return {
    editShow,
    onEditUpdated,
    onScheduleClose,
    onEditScheduleClick,
  }
}
