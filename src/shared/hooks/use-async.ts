import { ref } from 'vue'

export async function useAsync<T>(
  asyncFn: (...args: any[]) => Promise<T> | Promise<T>,
) {
  const error = ref()
  const state = ref<T | undefined>()

  async function execute() {
    const _promise = typeof asyncFn === 'function' ? asyncFn() : asyncFn
    try {
      state.value = await _promise
    } catch (e) {
      error.value = e
    }
  }

  await execute()

  return {
    error,
    state,
  }
}
