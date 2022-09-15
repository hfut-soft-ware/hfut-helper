import { request } from '@/server/base'
import type { TextResponse } from '@/shared/types/response/text'

export function getPlacard() {
  return request<TextResponse>({
    url: '/api/placard',
  })
}
