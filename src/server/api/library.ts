import { request } from '@/server/base'
import type { ILibrarySearchResponse } from '@/shared/types/response/library-search'
import type { ILibraryDetailResponse } from '@/shared/types/response/library-detail'

export function getLibrarySearchRequest(keyword: string, page: number) {
  return request<ILibrarySearchResponse>({
    url: '/api/book',
    params: {
      keyword,
      page,
      size: 50,
    },
  })
}

export function getLibraryDetailRequest(marcRecNo: number) {
  return request<ILibraryDetailResponse>({
    url: '/api/bookDetail',
    params: {
      marcRecNo,
    },
  })
}
