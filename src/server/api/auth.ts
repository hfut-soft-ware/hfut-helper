import { request } from '@/server/base'

export function loginRequest({ username, password }: { username: string; password: string }) {
  return request({
    url: '/login',
    method: 'GET',
    params: {
      username,
      password,
    },
  })
}
