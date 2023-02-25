import { ref } from 'vue'
import { getSemesters } from '@/server/api/user'
import type { Semester } from '@/shared/types/response/semesters'

export const useRequestSemesters = () => {
  const semesters = ref<Semester[]>([])
  getSemesters().then(({ data }) => [
    semesters.value = data.data,
  ])
  return { semesters }
}
