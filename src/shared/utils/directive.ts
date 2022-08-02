import type { App } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function setDirective(app: App) {
  app.directive('img-lazy', {
    mounted(el: HTMLImageElement, binding) {
      useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value
        }
      })
    },
  })
}
