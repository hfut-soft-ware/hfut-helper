import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { AjaxResponse } from 'uni-ajax'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { useAsyncState } from '@vueuse/core'
import { isFunction } from 'lodash'
import { TOKEN_KEY, USER_ACCOUNT_KEY, USER_INFO_KEY } from '@/shared/constant'
import { loginRequest } from '@/server/api/auth'
import { useAsync } from '@/shared/hooks/use-async'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { getUserInfo } from '@/server/api/user'
import type { Noop } from '@/shared/types/utils'

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

export type LoginDto = { studentId: string; password: string }

export const getUserData = () => uni.getStorageSync(USER_INFO_KEY)

export const setUserAccount = (userInfo: IUserInfo) => {
  uni.setStorageSync(USER_ACCOUNT_KEY, userInfo)
}

export const getUserAccount = () => uni.getStorageSync(USER_ACCOUNT_KEY) as LoginDto

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

  const setUserInfo = (userInfo: IUserInfo) => {
    uni.setStorageSync(USER_INFO_KEY, userInfo)
  }

  const logout = () => {
    uni.clearStorageSync()
  }

  const login = async({ studentId, password, callback }: LoginDto & { callback?: (token: string) => void | Promise<void> }) => {
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
      const token = (state.value as any).data.data.token as string

      Toast.success({
        message: `登录成功${getRandomQAQ('happy')[0]}`,
      })

      if (isFunction(callback)) {
        await callback(token)
      } else {
        setToken(token)
        setUserAccount({
          studentId,
          password,
        } as any)
      }
      uni.reLaunch({
        url: '/pages/day-schedule/index',
      })
    }
  }

  const getUserData = async() => {
    try {
      const { state } = await useAsync(getUserInfo)

      const data = (state.value as any).data.data as IUserInfo

      setUserInfo(data)

      return data
    } catch (err) {
      Toast.fail({
        message: `获取学生信息失败\n${getRandomQAQ('sadness')[0]}`,
      })
      return {}
    }
  }

  return {
    auth,
    login,
    logout,
    getUserData,
  }
})
