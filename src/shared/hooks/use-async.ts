import { ref, watchEffect } from 'vue'

export async function useAsync<T>(
  asyncFn: (...args: any[]) => T | Promise<T>,
) {
  const error = ref()
  const state = ref<T | undefined>()

  async function execute() {
    const _promise = typeof asyncFn === 'function' ? asyncFn : () => asyncFn
    try {
      console.log('执行请求中.....', _promise)
      state.value = await _promise()
    } catch (e) {
      error.value = e
    }
  }

  await execute()

  watchEffect(() => {
    console.log('watchEffect', state.value, error.value)
  })

  return {
    error,
    state,
  }
}
