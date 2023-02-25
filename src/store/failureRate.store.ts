import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleError } from '@/shared/utils/index'
import { getFailureRateRequest } from '@/server/api/score'
import type { IFailureRateData } from '@/shared/types/response/failure-rate'

export const useFailureRateStore = defineStore('failureRateStore', () => {
  const courseName = ref('')
  const failureRateData = ref<IFailureRateData[]>([])

  const getFailureRate = async() => {
    await getFailureRateRequest(courseName.value).then((res) => {
      failureRateData.value = res.data.data
    }).catch((error) => {
      failureRateData.value = []
      handleError(error)
    })
  }

  return {
    courseName,
    failureRateData,
    getFailureRate,
  }
})
