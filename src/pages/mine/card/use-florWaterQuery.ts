import { useAsyncState } from '@vueuse/core'
import { watchEffect } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getFlowWater } from '@/server/api/card'

export function useFlorWaterQuery() {
  const { state, error, isLoading } = useAsyncState(getFlowWater, {})

  watchEffect(() => {
    if (isLoading.value) {
      Toast.loading({
        duration: 0,
        message: `正在加载流水数据中....\n${getRandomQAQ('happy')[0]}`,
      })
    }

    if (!isLoading.value && !error.value) {
      Toast.clear()
      Toast.success({
        message: `流水数据加载成功\n${getRandomQAQ('happy')[0]}`,
      })
      uni.stopPullDownRefresh()
    }

    if (error.value) {
      Toast.fail({
        message: `校务网络好像出了点问题哦\n${getRandomQAQ('sadness')[0]}`,
      })
      uni.stopPullDownRefresh()
    }
  })

  return {
    state,
    error,
  }
}
