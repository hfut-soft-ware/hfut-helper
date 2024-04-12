import { request } from '@/server/base'
import type { SchoolList } from '@/shared/types/response/school'
import type { ResponseData } from '@/shared/types/utils'

export function getSchoolList(params: { pageNum: number; pageSize: number }) {
  return request<ResponseData<SchoolList>>({
    url: '/school/list',
    params,
  })
}
