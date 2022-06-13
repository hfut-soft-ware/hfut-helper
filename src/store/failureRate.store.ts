import { defineStore } from 'pinia'
import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getFailureRateRequest } from '@/server/api/score'
import type { IFailureRateData } from '@/shared/types/response/failure-rate'

export const useFailureRateStore = defineStore('failureRateStore', () => {
  const courseName = ref('')
  const failureRateData = ref<IFailureRateData[]>([])

  const getFailureRate = async() => {
    await getFailureRateRequest(courseName.value).then((res) => {
      failureRateData.value = res.data.data
    }).catch((err) => {
      const msg = err.data.msg
      failureRateData.value = []
      Toast.fail({
        message: `${msg}\n${getRandomQAQ('sadness')[0]}`,
      })
    })
  }

  return {
    courseName,
    failureRateData,
    getFailureRate,
  }
})
