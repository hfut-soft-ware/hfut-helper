import { join } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import {
  postcssWeappTailwindcssRename,
  ViteWeappTailwindcssPlugin as vwt,
} from 'weapp-tailwindcss-webpack-plugin'

const isH5 = process.env.UNI_PLATFORM === 'h5'

const postcssPlugins = [require('autoprefixer')(), require('tailwindcss')()]
if (!isH5) {
  postcssPlugins.push(
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    }),
  )
  postcssPlugins.push(postcssWeappTailwindcssRename({
    cssPreflight: {
      'box-sizing': false,
    },
  }))
}

function resolve(dir: string): string {
  return join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), vwt()],
  resolve: {
    alias: {
      '@': resolve('src/'),
    },
  },

  css: {
    postcss: {
      plugins: postcssPlugins,
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/mixins.scss";
          @import "@/assets/scss/vars.scss";
        `,
      },
    },
  },
})
