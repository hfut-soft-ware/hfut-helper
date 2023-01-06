const process = require('node:process')
const { join } = require('node:path')

const params = ['--dev', '-D']
const argvs = process.argv.slice(2)
const environment = getEnvironment(params, argvs)

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
