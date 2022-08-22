import type { AjaxInstance, AjaxRequestConfig } from 'uni-ajax'
import ajax from 'uni-ajax'
import { requestConfig } from '@/shared/config/request'
import { TOKEN_KEY } from '@/shared/constant'

const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY)
}

// const headers = {
//   authorization: `Bearer ${getToken()}`,
// }

export function createInstance(config: AjaxRequestConfig) {
  return ajax.create(config)
}

const baseInstance = createInstance({
  baseURL: requestConfig.baseURL,
})

baseInstance.interceptors.request.use((config: AjaxRequestConfig) => {
  config.header = {
    authorization: `Bearer ${getToken()}`,
    ...config.header,
  }
  return config
})

baseInstance.interceptors.response.use(res => res, (err) => {
  if (err.statusCode === 401) {
    uni.showModal({
      title: '你的账号密码似乎已经改了哦~',
      content: err.data?.msg || '请重新登录',
      showCancel: false,
      success() {
        uni.reLaunch({
          url: '/pages/login/login',
        })
      },
    })
  }
  return err
})

export function createRequest<T>() {
  return function(config: AjaxRequestConfig, instance: AjaxInstance<any> = baseInstance) {
    if (!config.method) {
      config.method = 'GET'
    }
    return instance<T>(config)
  }
}

export function request<T>(config: AjaxRequestConfig, instance: AjaxInstance<any> = baseInstance) {
  if (!config.method) {
    config.method = 'GET'
  }
  return instance<T>(config)
}
