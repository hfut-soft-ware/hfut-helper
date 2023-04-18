import type { AjaxInstance, AjaxRequestConfig } from 'uni-ajax'
import ajax from 'uni-ajax'
import { requestConfig } from '@/shared/config/request'
import { SING_KEY, TOKEN_KEY, USER_ACCOUNT_KEY } from '@/shared/constant'
import { createSign } from '@/shared/utils/auth'

const getLocalStore = (key: string) => {
  return uni.getStorageSync(key)
}

export function createInstance(config: AjaxRequestConfig) {
  return ajax.create(config)
}

const baseInstance = createInstance({
  baseURL: requestConfig.baseURL,
})

baseInstance.interceptors.request.use((config: AjaxRequestConfig) => {
  config.header = {
    authorization: `Bearer ${getLocalStore(TOKEN_KEY)}`,
    ...config.header,
  }
  const signKey = getLocalStore(SING_KEY)
  const key = createSign(config.url as string, getLocalStore(USER_ACCOUNT_KEY).studentId, signKey)
  if (config.method === 'GET') {
    config.params = {
      key,
      ...config.params,
    }
  } else {
    config.data = {
      key,
      ...config.data as object,
    }
  }
  return config
})

baseInstance.interceptors.response.use(res => res, (err) => {
  if (err.statusCode === 401) {
    uni.showModal({
      title: '你的账号密码似乎已经改了哦~',
      content: err.data?.msg || '请重新登录',
      showCancel: false,
    })
  }
  throw err
})

export function request<T>(config: AjaxRequestConfig, instance: AjaxInstance<any> = baseInstance) {
  if (!config.method) {
    config.method = 'GET'
  }
  return instance<T>(config)
}

export const loginInstance = createInstance({
  baseURL: 'https://login.hfut-space.top',
})
