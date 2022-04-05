#!/usr/bin/env node

const commandSpawn = require('./utils/terminal')

const provOrDev = process.argv.find(item => item === 'build' || item === 'start')

// windows 实际是 npm.cmd
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

// 先拿到前一个进程，保存到 process.env
const preProcess = process.cwd()
process.env.preProcess = preProcess

async function foo() {
  // 打包
  if (provOrDev === 'build') {
    try {
      // 1 npm run build   /Users/dengwenjie/FE/myCode/myBuild/package/react-cli
      await commandSpawn(npm, ['run', provOrDev], { cwd: __dirname })
    } catch (error) {
      console.log(error)
    }
  }
}
foo()


// 开启本地服务
if (provOrDev === 'start') {
  try {
    // npm run start
    commandSpawn(npm, ['run', provOrDev])
  } catch (error) {
    console.log(error)
  }
}
