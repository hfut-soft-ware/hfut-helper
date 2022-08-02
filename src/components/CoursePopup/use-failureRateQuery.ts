import { storeToRefs } from 'pinia'
import type { useFailureRateStore } from '@/store/failureRate.store'

export function useFailureRateQuery(
  store: ReturnType<typeof useFailureRateStore>,
  courseName: string,
) {
  const { courseName: courseStoreName } = storeToRefs(store)

  const handleFailureRateQueryClick = () => {
    uni.navigateTo({
      url: '/sub1/pages/failure-rate/failure-rate',
    })
    courseStoreName.value = courseName
  }

  return {
    handleFailureRateQueryClick,
  }
}
