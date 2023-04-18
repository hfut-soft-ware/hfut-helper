import { loginInstance as request } from '../base'

import type { ILoginResponse } from '@/shared/types/response/auth'

export function loginRequest({ studentId, password }: { studentId: string; password: string }) {
  return request<ILoginResponse>({
    url: 'v2/login',
    method: 'POST',
    data: {
      studentId,
      password,
    },
  })
}
