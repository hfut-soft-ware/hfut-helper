import type { AjaxResponse } from 'uni-ajax'

export function createResponseData<T>(data: T) {
  return {
    data,
  } as unknown as AjaxResponse<T>
}
