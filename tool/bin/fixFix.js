// 需要先将vant组件库和store中需要修复的文件，放到根目录的fix文件夹下
const process = require('node:process')
const { join } = require('node:path')
const { cp } = require('node:fs/promises')

const params = ['--dev', '-D']
const argvs = process.argv.slice(2)
const environment = getEnvironment(params, argvs)

const componentsDest = environment === 'development'
  ? resolve('../../dist/dev/mp-weixin/components')
  : resolve('../../dist/build/mp-weixin/components')

const componentsSource = resolve('../../fix/components/')

fixFile(environment)

function resolve(dir) {
  return join(__dirname, dir)
}

function getEnvironment(params, argvs) {
  for (const argv of argvs) {
    if (params.includes(argv)) {
      return 'development'
    }
  }
  return 'production'
}

async function fixFile(environment) {
  try {
    await cp(componentsSource, componentsDest, { recursive: true })
  } catch (error) {
    console.log(error)
  }

  if (environment === 'production') {
    try {
      await cp(resolve('../../fix/store/'), resolve('../../dist/build/mp-weixin/store/'), { recursive: true })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('🍟 fix file finished!')
}
