import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClassmatesStore = defineStore('classmatesStore', () => {
  const couresId = ref(1)
  return {
    couresId,
  }
})
