import type { AjaxInstance, AjaxRequestConfig, AjaxResponse, Request } from 'uni-ajax'
import ajax from 'uni-ajax'
import { requestConfig } from '@/shared/config/request'

const headers = {
  authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkdXNlcklkIjoyMDIxMjE3OTg2LCJzdWIiOiJ1c2VyIiwibmFtZSI6IuW4uOePgua0gSIsImlhdCI6MTY1MjQyNzAxNn0.TUA0ByxDHTgD7t0W9jOlVZC8R5flojNre9TX0CXEiQg',
}

export function createInstance(config: AjaxRequestConfig) {
  return ajax.create(config)
}

const baseInstance = createInstance({
  baseURL: requestConfig.baseURL,
})

baseInstance.interceptors.request.use((config: AjaxRequestConfig) => {
  config.header = {
    ...config.header,
    authorization: headers.authorization,
  }
  return config
})

export function createRequest<T>() {
  return function(config: AjaxRequestConfig, instance: AjaxInstance<any> = baseInstance) {
    if (!config.method) {
      config.method = 'GET'
    }
    return instance(config)
  }
}

export function request<T>(config: AjaxRequestConfig, instance: AjaxInstance<any> = baseInstance) {
  if (!config.method) {
    config.method = 'GET'
  }
  return instance<T>(config)
}
