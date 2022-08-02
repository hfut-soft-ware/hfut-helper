import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/assets/scss/index.css'
import '@/assets/scss/components.css'

// icons
import '@/assets/icons/todo.png'
import '@/assets/icons/todo-active.png'
import '@/assets/icons/week.png'
import '@/assets/icons/week-active.png'
import '@/assets/icons/score.png'
import '@/assets/icons/score-active.png'
import '@/assets/icons/mine.png'
import '@/assets/icons/mine-active.png'
import '@/assets/icons/galaxy.png'
import '@/assets/icons/star-moon.png'
import '@/assets/icons/telescope.png'
import '@/assets/icons/astronaut.png'
import '@/assets/icons/flyship.png'
import '@/assets/icons/satellite-orbit.png'
import '@/assets/icons/detour.png'
import '@/assets/icons/rocket-2.png'
import '@/assets/icons/flyBall.png'

// imgs
// import '@/pages/mine/about/donate/donate.png'
import '@/assets/imgs/avatar.png'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
    app,
  }
}
