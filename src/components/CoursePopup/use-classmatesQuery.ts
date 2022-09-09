import { useClassmatesStore } from '@/store/classmates.store'

export function useClassmateQuery() {
  const classmatesStore = useClassmatesStore()
  const handleClassmatesQueryClick = (couresId: number) => {
    uni.redirectTo({
      url: '/sub1/pages/classmates/classmates',
    })
    classmatesStore.couresId = couresId
  }
  return {
    handleClassmatesQueryClick,
  }
}
