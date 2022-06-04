import { useAsyncState } from '@vueuse/core'
import { watchEffect } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { useAuthStore } from '@/store/auth.store'
import type { IUserInfo } from '@/shared/types/response/userInfo'

export function useGetUserInfo() {
  const authStore = useAuthStore()

  // TODO useAsyncQueue
  const { state, error: userInfoError } = useAsyncState(authStore.getUserData(), {
    department: '合肥工业大学',
    adminClass: '',
    grade: '',
    name: '',
  } as IUserInfo)

  watchEffect(() => {
    if (userInfoError.value) {
      Toast.fail({
        message: `获取用户信息失败了\n${getRandomQAQ('sadness')[0]}`,
      })
    }
  })

  return {
    state,

  }
}
