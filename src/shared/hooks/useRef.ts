import type { UnwrapRef } from 'vue'
import { ref } from 'vue'
import { isFunction } from 'lodash'

export function useRef<T>(initialValue: T) {
  const refVal = ref(initialValue)
  const setRef = (newVal: T | ((prevState: T) => UnwrapRef<T>)) => {
    refVal.value = isFunction(newVal) ? newVal(refVal.value as T) : newVal as UnwrapRef<T>
  }

  return [refVal, setRef] as const
}
