import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/scss/index.css'
import '@/assets/icons/todo.png'
import '@/assets/icons/todo-active.png'
import '@/assets/icons/week.png'
import '@/assets/icons/week-active.png'
import '@/assets/icons/score.png'
import '@/assets/icons/score-active.png'
import '@/assets/icons/mine.png'
import '@/assets/icons/mine-active.png'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
    app,
  }
}
