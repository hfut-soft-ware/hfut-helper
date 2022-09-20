import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { AjaxResponse } from 'uni-ajax'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { isFunction } from 'lodash'
import { TOKEN_KEY, USER_ACCOUNT_KEY, USER_INFO_KEY } from '@/shared/constant'
// import { loginRequest } from '@/server/api/auth'
import { useAsync } from '@/shared/hooks/use-async'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { getUserInfo } from '@/server/api/user'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { requestConfig } from '@/shared/config/request'

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

export const [getUserData] = useSyncStorage(USER_INFO_KEY)

export const [getUserAccount, setUserAccount] = useSyncStorage<LoginDto>(USER_ACCOUNT_KEY)

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
    uni.request({
      url: `${requestConfig.baseURL}v2/login`,
      method: 'POST',
      data: {
        studentId,
        password,
      },
      async success(state) {
        if (state.statusCode !== 200) {
          Toast.fail({
            message: `${(state as AjaxResponse).data.msg || '登录失败!'}\n${getRandomQAQ('sadness')[0]}`,
          })

          return
        }

        const token = (state as any).data.data.token as string

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
      },
    })
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
    }
  }

  return {
    auth,
    login,
    logout,
    getUserData,
  }
})
