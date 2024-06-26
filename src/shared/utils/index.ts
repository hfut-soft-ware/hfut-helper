import { getRandomQAQ } from 'qaq-font'
import Toast from '@vant/weapp/dist/toast/toast'

export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

export const isEmptyObject = (val: unknown) =>
  isObject(val) && Object.keys(val as object).length === 0

export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'

export const isNull = (val: unknown): val is null => val === null

export const isNullOrUndefined = (val: unknown) =>
  isNull(val) || isUndefined(val)

export const hasProp = <T extends object, K extends keyof T>(obj: T, key: K) => !isNullOrUndefined(obj) && !isEmptyObject(obj) && Reflect.has(obj, key)

export const isOdd = (num: number) => num % 2 !== 0

export const formatSemester = (semester: string) => {
  const regRes = /20([0-9]{2})-20[0-9]{2}学年第(.{1})学期/.exec(semester)
  return `${regRes![1]}-${regRes![2].replace('一', '1').replace('二', '2')}`
}

export const ascend = (arr: number[]) => {
  return arr.sort((a, b) => a - b)
}

export const onNavigateClick = (path: string) => {
  uni.navigateTo({
    url: path,
  })
}

/**
 * @description 处理请求错误
 */
export const handleError = (err: any, msg?: string) => {
  Toast.clear()
  Toast.fail({
    message: `${msg ? `${msg}\n` : ''}${err?.data?.msg}\n${getRandomQAQ('sadness')[0]}`,
    duration: 2000,
  })
}
