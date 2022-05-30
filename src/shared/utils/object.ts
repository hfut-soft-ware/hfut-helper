export const unset = <T extends object, K extends keyof T>(
  obj: T,
  key: K | string,
) => Reflect.deleteProperty(obj, key)

export const set = <T extends object, K extends keyof T>(
  obj: T,
  key: K,
  val: any,
) => Reflect.set(obj, key, val)
