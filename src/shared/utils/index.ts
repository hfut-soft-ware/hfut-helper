export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

export const isEmptyObject = (val: unknown) =>
  isObject(val) && Object.keys(val as object).length === 0

export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'

export const isNull = (val: unknown): val is null => val === null

export const isNullOrUndefined = (val: unknown) =>
  isNull(val) || isUndefined(val)

export const hasProp = <T extends object, K extends keyof T>(obj: T, key: K) => !isNullOrUndefined(obj) && !isEmptyObject(obj) && Reflect.has(obj, key)
