import { cwd } from 'process'
import { join } from 'path'
import { cp } from 'fs/promises'
import type { PluginOption } from 'vite'

type Mode = 'development' | 'production'
let firstLoading = true

export default function viteFix(): PluginOption {
  let mode: Mode
  return {
    name: 'vite-plugin-fix',
    config(_config, env) {
      mode = env.mode as Mode
    },
    async closeBundle() {
      if (!firstLoading) {
        return
      }
      const rootPath = cwd()
      const resolve = (...paths: string[]) => join(rootPath, ...paths)

      const componentsPath = resolve('/fix/components/')
      const componentsDest = mode === 'development' ? resolve('/dist/dev/mp-weixin/components/') : resolve('/dist/build/mp-weixin/components/')
      const storePath = resolve('/fix/store/')

      try {
        await cp(componentsPath, componentsDest, { recursive: true })
      } catch (error) {
        console.log(error)
      }

      if (mode === 'production') {
        try {
          await cp(storePath, resolve('/dist/build/mp-weixin/store/'), { recursive: true })
        } catch (error) {
          console.log(error)
        }
      }

      firstLoading = false
      console.log('🍟 fix file finished!')
    },
  }
}
