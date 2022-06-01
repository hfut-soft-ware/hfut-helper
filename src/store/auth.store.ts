import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { AjaxResponse } from 'uni-ajax'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { TOKEN_KEY } from '@/shared/constant'
import { loginRequest } from '@/server/api/auth'
import { useAsync } from '@/shared/hooks/use-async'

export const enum AuthStatus {
  // eslint-disable-next-line no-unused-vars
  UN_LOGIN,
  // eslint-disable-next-line no-unused-vars
  LOGIN_IN,
}

function checkIsLogin(): AuthStatus {
  const token = uni.getStorageSync(TOKEN_KEY) as string
  return token.length > 0 ? AuthStatus.LOGIN_IN : AuthStatus.UN_LOGIN
}

export const useAuthStore = defineStore('authStore', () => {
  const auth = reactive<{
    token: string
    status: AuthStatus
  }>({
    token: '',
    status: checkIsLogin(),
  })

  const setToken = (tokenPayload: string) => {
    auth.token = tokenPayload
    uni.setStorageSync(TOKEN_KEY, tokenPayload)
  }

  const logout = () => {}

  const login = async({ studentId, password }: { studentId: string; password: string }) => {
    const { state, error } = await useAsync(loginRequest({
      studentId,
      password,
    }) as any)

    if (error.value) {
      Toast.fail({
        message: `${(error.value as AjaxResponse).data?.msg || '登录失败!'}\n${getRandomQAQ('sadness')[0]}`,
      })
      return
    }

    if (state.value) {
      Toast.success({
        message: `登录成功${getRandomQAQ('happy')[0]}`,
      })
      setToken((state.value as any).data.data.token as string)
      uni.switchTab({
        url: '/pages/day-schedule/index',
      })
    }
  }

  return {
    auth,
    login,
    logout,
  }
})
