import { createInstance, createRequest } from '../base'
import { requestConfig } from '@/shared/config/request'

const instance = createInstance({
  baseURL: requestConfig.baseURL,
})

const authRequest = createRequest()

export function loginRequest({ studentId, password }: { studentId: string; password: string }) {
  return authRequest({
    url: 'v2/login',
    method: 'POST',
    data: {
      studentId,
      password,
    },
    header: { authRequest: true },
  }, instance)
}
