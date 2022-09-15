import { request } from '@/server/base'
import type { TextResponse } from '@/shared/types/response/text'
import type { HelpType } from '@/shared/types/utils'

export function getHelp(type: HelpType) {
  return request<TextResponse>({
    url: `/api/help/${type}`,
  })
}
