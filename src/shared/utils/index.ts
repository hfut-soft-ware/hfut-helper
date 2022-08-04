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
  return `20${regRes![1]}0${regRes![2].replace('一', '1').replace('二', '2')}`
}
