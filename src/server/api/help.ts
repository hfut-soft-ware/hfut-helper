import { request } from '@/server/base'
import type { HelpResponse } from '@/shared/types/response/help'
import type { HelpType } from '@/shared/types/utils'

export function getHelp(type: HelpType) {
  return request<HelpResponse>({
    url: `/api/help/${type}`,
  })
}
