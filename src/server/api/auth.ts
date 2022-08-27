import { request } from '../base'

export function loginRequest({ studentId, password }: { studentId: string; password: string }) {
  return request({
    url: 'v2/login',
    method: 'POST',
    data: {
      studentId,
      password,
    },
  })
}
